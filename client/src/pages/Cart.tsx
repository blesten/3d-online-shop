import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Header from '../components/cart/Header'
import Navbar from './../components/general/Navbar'
import FrontCart from '../components/cart/FrontCart'
import Address from '../components/cart/Address'
import Footer from '../components/general/Footer'
import state from './../store'
import { IoShirt } from 'react-icons/io5'
import HeadInfo from '../utils/HeadInfo'

const Cart = () => { 
  const snap = useSnapshot(state)
  
  const [currentComp, setCurrentComp] = useState('front')

  return (
    <>
      <HeadInfo title='Cart' />
      <div className='sticky top-0 left-0 w-full z-50 bg-white'>
        <Navbar />
      </div>
      <Header currentComp={currentComp} />

      {
        snap.cart.length === 0
        ? (
          <div className='flex flex-col items-center mt-20'>
            <div className='relative'>
              <IoShirt className='text-gray-300 text-9xl' />
              <div className='absolute w-3 h-[200px] rotate-45 bg-gray-300 -top-8 left-1/2 -translate-x-1/2' />
            </div>
            <p className='text-gray-400 mt-14'>Your cart is currently empty</p>
          </div>
        )
        : (
          <>
            {
              currentComp === 'front' &&
              <FrontCart setCurrentComp={setCurrentComp} />
            }

            {
              currentComp === 'middle' &&
              <Address setCurrentComp={setCurrentComp} />
            }
          </>
        )
      }
      <Footer />
    </>
  )
}

export default Cart