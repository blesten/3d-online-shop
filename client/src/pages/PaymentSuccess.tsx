import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { patchDataAPI } from './../utils/baseAPI'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import Button from './../components/general/Button'
import state from './../store'
import HeadInfo from '../utils/HeadInfo'

const PaymentSuccess = () => {
  const navigate = useNavigate()

  const snap = useSnapshot(state)

  useEffect(() => {
    const updatePaymentStatus = async() => {
      await patchDataAPI('checkout', {}, snap.user.accessToken)
      state.cart = []
    }

    if (snap.user.accessToken)
      updatePaymentStatus()
  }, [snap.user])

  useEffect(() => {
    if (!snap.user.loading) {
      if (!snap.user.accessToken) {
        navigate('/')
      }
    }
  }, [snap.user, navigate])

  return (
    <>
      <HeadInfo title='Payment Success' />
      <div className='w-screen h-screen overflow-hidden px-14 py-8 flex flex-col justify-center'>
        <div className='flex items-center gap-3 fixed top-8 md:left-14 left-6'>
          <img src='/images/logo.svg' alt='Stitch Lab' className='w-10' />
          <h1 className='text-primary font-medium text-lg'>Stitch Lab</h1>
        </div>
        <div className='flex items-center justify-center flex-col'>
          <IoCheckmarkCircleOutline className='text-green-500 text-[10rem] mb-8' />
          <h1 className='text-primary text-2xl font-medium'>Payment Success</h1>
          <p className='text-xs text-neutral-700 text-center mt-4'>Thank you for your payment. Your product will be delivered soon.</p>
          <Button
            text='Order History'
            customStyles='bg-primary hover:bg-primary-hover text-white py-3 text-sm font-medium px-7 transition duration-200 mt-7'
            handleClick={() => navigate('/order_history')}
          />
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess