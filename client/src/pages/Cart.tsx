import { useState } from 'react'
import Header from '../components/cart/Header'
import Navbar from './../components/general/Navbar'
import FrontCart from '../components/cart/FrontCart'
import Address from '../components/cart/Address'

const Cart = () => { 
  const [currentComp, setCurrentComp] = useState('front')

  return (
    <>
      <Navbar />
      <Header currentComp={currentComp} />
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

export default Cart