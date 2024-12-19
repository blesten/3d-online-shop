import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Saved from './pages/Saved'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved' element={<Saved />} />
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