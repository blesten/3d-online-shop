import { MdShoppingBag , MdOutlineShoppingBag } from 'react-icons/md'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import state from './../../store'
import Button from './Button'

const Navbar = () => {
  const { pathname } = useLocation()

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
    <div className='flex items-center justify-between px-20 py-8'>
      <Link to='/' className='flex items-center gap-5 outline-none'>
        <img src='/images/logo.svg' alt='Stanley Claudius - 3D Online Shop Sample Works'  className='w-10 h-10' />
        <h1 className='text-primary font-semibold text-lg'>Stitch Lab</h1>
      </Link>
      <div className='flex items-center gap-9'>
        <Link to='/saved' className='outline-none relative'>
          {
            pathname === '/saved'
            ? <IoBookmark className='text-2xl text-primary cursor-pointer' />
            : <IoBookmarkOutline className='text-2xl text-primary cursor-pointer' />
          }
          {
            state.saved.length > 0 &&
            <div className='absolute -top-2 -right-2 w-5 h-5 bg-[#ffa987] rounded-full flex items-center justify-center text-xs text-white'>
              <p>{state.saved.length}</p>
            </div>
          }
        </Link>
        <Link to='/cart' className='outline-none relative'>
          {
            pathname === '/cart'
            ? <MdShoppingBag className='text-2xl text-primary cursor-pointer' />
            : <MdOutlineShoppingBag className='text-2xl text-primary cursor-pointer' />
          }
          {
            state.cart.length > 0 &&
            <div className='absolute -top-2 -right-2 w-5 h-5 bg-[#ffa987] rounded-full flex items-center justify-center text-xs text-white'>
              <p>{state.cart.length}</p>
            </div>
          }
        </Link>
        <Button
          text='Sign In'
          customStyles='bg-primary text-white text-sm px-5 py-2 font-medium transition duration-200 hover:bg-primary-hover'
          handleClick={() => {}}
        />
      </div>
    </div>
  )
}

export default Navbar