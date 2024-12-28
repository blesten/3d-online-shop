import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Saved from './pages/Saved'
import Edit from './pages/Edit'
import Cart from './pages/Cart'
import { useEffect } from 'react'
import state from './store'

const App = () => {
  useEffect(() => {
    const getSavedData = () => {
      const savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
      state.saved = savedData || []
    }

    getSavedData()
  }, [])

  useEffect(() => {
    const getCartData = () => {
      const cartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!)
      state.cart = cartData || []
    }

    getCartData()
  }, [])
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  )
}

export default App  