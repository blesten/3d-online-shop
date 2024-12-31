import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Header from '../components/cart/Header'
import Navbar from './../components/general/Navbar'
import FrontCart from '../components/cart/FrontCart'
import Address from '../components/cart/Address'
import Footer from '../components/general/Footer'
import state from './../store'

const Cart = () => { 
  const snap = useSnapshot(state)
  
  const [currentComp, setCurrentComp] = useState('front')

  return (
    <>
      <div className='sticky top-0 left-0 w-full z-50 bg-white'>
        <Navbar />
      </div>
      <Header currentComp={currentComp} />

      {
        snap.cart.length === 0
        ? (
          <div className='flex flex-col items-center mt-14'>
            <img src='/images/empty_cart.svg' alt='Stitch Lab' className='w-96' />
            <p className='text-neutral-400 mt-12'>Your cart is currently empty</p>
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