import { useState } from 'react'
import Header from '../components/cart/Header'
import Navbar from './../components/general/Navbar'
import FrontCart from '../components/cart/FrontCart'
import Address from '../components/cart/Address'
import Footer from '../components/general/Footer'

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
      <Footer />
    </>
  )
}

export default Cart