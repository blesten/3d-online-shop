import { IoCloseCircleOutline } from 'react-icons/io5'
import { patchDataAPI } from './../utils/baseAPI'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import Button from './../components/general/Button'
import state from './../store'

const PaymentCancel = () => {
  const snap = useSnapshot(state)

  const navigate = useNavigate()

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
    <div className='w-screen h-screen overflow-hidden px-14 py-8 flex flex-col justify-center'>
      <div className='flex items-center gap-3 fixed top-8 left-14'>
        <img src='/images/logo.svg' alt='Stitch Lab' className='w-10' />
        <h1 className='text-primary font-medium text-lg'>Stitch Lab</h1>
      </div>
      <div className='flex items-center justify-center flex-col'>
        <IoCloseCircleOutline className='text-red-500 text-[10rem] mb-8' />
        <h1 className='text-primary text-2xl font-medium'>Payment Failed</h1>
        <p className='text-xs text-neutral-700 mt-4'>It seems like the payment process is being interrupted. Please try again to checkout.</p>
        <Button
          text='Home'
          customStyles='bg-primary hover:bg-primary-hover text-white py-3 text-sm font-medium px-7 transition duration-200 mt-7'
          handleClick={() => navigate('/')}
        />
      </div>
    </div>
  )
}

export default PaymentCancel