import { MdShoppingBag , MdOutlineShoppingBag } from 'react-icons/md'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import state from './../../store'
import Button from './Button'
import { useSnapshot } from 'valtio'
import Authentication from '../auth/Authentication'
import { useEffect, useState } from 'react'
import { getDataAPI } from '../../utils/baseAPI'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [openAuthenticationOverlay, setOpenAuthenticationOverlay] = useState(false)
  const [selectedAuthScreen, setSelectedAuthScreen] = useState('signIn')

  const { pathname } = useLocation()
  
  const navigate = useNavigate()

  const snap = useSnapshot(state)

  const handleClickSignInBtn = () => {
    setSelectedAuthScreen('signIn')
    setOpenAuthenticationOverlay(true)
  }

  const handleLogout = async() => {
    const res = await getDataAPI('user/logout')
    navigate('/')
    localStorage.setItem('SL_IS_AUTH', 'N')
    state.user = {}
    toast.success(res.data.msg)
  }

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

  return (
    <>
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
              snap.saved.length > 0 &&
              <div className='absolute -top-2 -right-2 w-5 h-5 bg-[#ffa987] rounded-full flex items-center justify-center text-xs text-white'>
                <p>{snap.saved.length}</p>
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
              snap.cart.length > 0 &&
              <div className='absolute -top-2 -right-2 w-5 h-5 bg-[#ffa987] rounded-full flex items-center justify-center text-xs text-white'>
                <p>{snap.cart.length}</p>
              </div>
            }
          </Link>
          {
            snap.user.accessToken
            ? <h1 onClick={handleLogout}>{snap.user.user?.name}</h1>
            : (
              <Button
                text='Sign In'
                customStyles='bg-primary text-white text-sm px-5 py-2 font-medium transition duration-200 hover:bg-primary-hover'
                handleClick={handleClickSignInBtn}
              />
            )
          }
        </div>
      </div>

      <Authentication
        openAuthenticationOverlay={openAuthenticationOverlay}
        setOpenAuthenticationOverlay={setOpenAuthenticationOverlay}
        selectedAuthScreen={selectedAuthScreen}
        setSelectedAuthScreen={setSelectedAuthScreen}
      />
    </>
  )
}

export default Navbar