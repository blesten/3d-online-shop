import { useEffect, useState } from 'react'
import Footer from '../components/general/Footer'
import Navbar from './../components/general/Navbar'
import { ICheckout } from '../utils/interface'
import { getDataAPI } from '../utils/baseAPI'
import { useSnapshot } from 'valtio'
import state from './../store'
import { formatDate } from '../utils/date'
import { FaEye } from 'react-icons/fa6'
import OrderDetail from '../components/overlay/OrderDetail'

const OrderHistory = () => {
  const [history, setHistory] = useState<ICheckout[]>([])
  const [openOrderDetailOverlay, setOpenOrderDetailOverlay] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Partial<ICheckout>>({})

  const snap = useSnapshot(state)

  const handleClickOrderDetail = (order: ICheckout) => {
    setSelectedOrder(order)
    setOpenOrderDetailOverlay(true)
  }

  useEffect(() => {
    const getHistoryData = async() => {
      const res = await getDataAPI('checkout', snap.user.accessToken)
      setHistory(res.data.checkout)
    }

    if (snap.user.accessToken) {
      getHistoryData()
    }
  }, [snap.user])

  return (
    <>
      <Navbar />
      <div className='px-20 mt-4'>
        <h1 className='font-medium text-lg text-neutral-700'>Order History</h1>
        <div className='w-full mt-8'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm font-medium bg-neutral-100 text-center'>
                <td className='p-3'>No</td>
                <td>Order ID</td>
                <td>Total Items</td>
                <td>Net Amount</td>
                <td>Status</td>
                <td>Order Date</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                history.map((item, idx) => (
                  <tr key={item._id} className='text-sm text-center'>
                    <td className='p-3'>{idx + 1}</td>
                    <td>{item._id}</td>
                    <td>{item.products.reduce((acc, it) => it.qty + acc, 0)}</td>
                    <td>${(item.products.reduce((acc, it) => (it.qty * it.price) + acc, 0)).toFixed(2)}</td>
                    <td>{item.status === 'Payment Success' ? 'Paid' : item.status === 'Payment Failed' ? 'Unpaid' : item.status}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <FaEye onClick={() => handleClickOrderDetail(item)} className='m-auto text-blue-500 cursor-pointer' />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {
        Object.keys(selectedOrder).length > 0 &&
        <OrderDetail
          openOrderDetailOverlay={openOrderDetailOverlay}
          setOpenOrderDetailOverlay={setOpenOrderDetailOverlay}
          selectedOrder={selectedOrder}
        />
      }
    </>
  )
}

export default OrderHistory