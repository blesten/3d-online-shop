import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { useSnapshot } from 'valtio'
import { getDataAPI } from './utils/baseAPI'
import { useEffect } from 'react'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import OrderHistory from './pages/OrderHistory'
import Saved from './pages/Saved'
import state from './store'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

const App = () => {
  const snap = useSnapshot(state)

  useEffect(() => {
    const getSavedData = async() => {
      let savedData
      
      if (snap.user.accessToken) {
        const res = await getDataAPI('saved', snap.user.accessToken)
        state.saved = res.data.data
      } else {
        savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
        state.saved = savedData || []
      }
    }

    getSavedData()
  }, [snap.user])

  useEffect(() => {
    const getCartData = async() => {
      let cartData

      if (snap.user.accessToken) {
        const res = await getDataAPI('cart', snap.user.accessToken)
        state.cart = res.data.data
      } else {
        cartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!)
        state.cart = cartData || []
      }
    }

    getCartData()
  }, [snap.user])

  useEffect(() => {
    const getLoginUserData = async() => {
      state.user = { ...state.user, loading: true }
      const lsAuth = localStorage.getItem('SL_IS_AUTH')
      if (lsAuth && lsAuth === 'Y') {
        const res = await getDataAPI('user/refresh_token')
        state.user = {
          accessToken: res.data.accessToken,
          user: res.data.user
        }
      }
      state.user = { ...state.user, loading: false }
    }

    getLoginUserData()
  }, [])
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment_success' element={<PaymentSuccess />} />
          <Route path='/payment_cancel' element={<PaymentCancel />} />
          <Route path='/order_history' element={<OrderHistory />} />
          <Route path='*' element={<NotFound />} />
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