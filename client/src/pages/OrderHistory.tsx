import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { getDataAPI } from './../utils/baseAPI'
import { formatDate } from './../utils/date'
import { ICheckout } from './../utils/interface'
import { FaEye } from 'react-icons/fa6'
import OrderDetail from './../components/overlay/OrderDetail'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import state from './../store'
import Loader from '../components/general/Loader'

const OrderHistory = () => {
  const [history, setHistory] = useState<ICheckout[]>([])
  const [openOrderDetailOverlay, setOpenOrderDetailOverlay] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Partial<ICheckout>>({})
  const [loading, setLoading] = useState(false)

  const snap = useSnapshot(state)

  const handleClickOrderDetail = (order: ICheckout) => {
    setSelectedOrder(order)
    setOpenOrderDetailOverlay(true)
  }

  useEffect(() => {
    const getHistoryData = async() => {
      setLoading(true)
      const res = await getDataAPI('checkout', snap.user.accessToken)
      setHistory(res.data.checkout)
      setLoading(false)
    }

    if (snap.user.accessToken) {
      getHistoryData()
    }
  }, [snap.user])

  return (
    <>
      <Navbar />
      <div className='px-20 mt-4'>
        <h1 className='font-medium text-lg text-primary'>Order History</h1>
        <div className='w-full mt-8'>
          {
            loading
            ? <Loader size='2xl' />
            : (
              <>
                {
                  history.length > 0
                  ? (
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
                              <td>
                                <p className={`m-auto ${item.status === 'Order Placed' ? 'bg-blue-50 rounded-md text-xs font-semibold px-3 py-1 border border-blue-500 text-blue-600 w-fit' : item.status === 'Payment Success' ? 'bg-green-50 rounded-md text-xs font-semibold px-3 py-1 border border-green-500 text-green-600 w-fit' : item.status === 'Payment Failed' ? 'bg-red-50 rounded-md text-xs font-semibold px-3 py-1 border border-red-500 text-red-600 w-fit' : item.status === 'On Delivery' ? 'bg-orange-50 rounded-md text-xs font-semibold px-3 py-1 border border-orange-500 text-orange-600 w-fit' : 'bg-gray-50 rounded-md text-xs font-semibold px-3 py-1 border border-gray-500 text-gray-600 w-fit'}`}>
                                  {item.status === 'Payment Success' ? 'Paid' : item.status === 'Payment Failed' ? 'Unpaid' : item.status}
                                </p>
                              </td>
                              <td>{formatDate(item.createdAt)}</td>
                              <td>
                                <FaEye onClick={() => handleClickOrderDetail(item)} className='m-auto text-blue-500 cursor-pointer' />
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : (
                    <div className='flex flex-col items-center mt-3'>
                      <img src='/images/empty_history.svg' alt='Stitch Lab' className='w-80' />
                      <p className='text-neutral-400 mt-12'>Order history is currently empty</p>
                    </div>
                  )
                }
              </>
            )
          }
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