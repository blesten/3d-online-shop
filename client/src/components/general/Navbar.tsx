import { MdShoppingBag , MdOutlineShoppingBag, MdLogout } from 'react-icons/md'
import { IoBookmark, IoBookmarkOutline, IoShirt } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import state from './../../store'
import Button from './Button'
import { useSnapshot } from 'valtio'
import Authentication from '../auth/Authentication'
import { useEffect, useRef, useState } from 'react'
import { getDataAPI } from '../../utils/baseAPI'
import { toast } from 'react-toastify'
import { BsKeyFill } from 'react-icons/bs'
import ChangePassword from '../overlay/ChangePassword'

const Navbar = () => {
  const [openAuthenticationOverlay, setOpenAuthenticationOverlay] = useState(false)
  const [selectedAuthScreen, setSelectedAuthScreen] = useState('signIn')
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)
  const [openChangePasswordOverlay, setOpenChangePasswordOverlay] = useState(false)

  const { pathname } = useLocation()
  
  const navigate = useNavigate()

  const snap = useSnapshot(state)

  const profileDropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>

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

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openProfileDropdown && profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setOpenProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openProfileDropdown])

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
            ? (
              <div ref={profileDropdownRef} className='relative'>
                <div onClick={() => setOpenProfileDropdown(!openProfileDropdown)} className='w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                  {
                    snap.user.user?.avatar
                    ? ''
                    : <p className='text-white font-medium'>{snap.user.user?.name[0]}</p>
                  }
                </div>
                <div className={`absolute top-full mt-2 right-0 w-[200px] bg-white rounded-md border border-neutral-100 z-40 transition duration-100 origin-top ${openProfileDropdown ? 'scale-y-100 pointer-events-auto' : 'scale-y-0 pointer-events-none'}`}>
                  <div onClick={() => setOpenChangePasswordOverlay(true)} className='flex items-center gap-3 py-3 cursor-pointer px-5 text-sm transition'>
                    <BsKeyFill />
                    <p>Change Password</p>
                  </div>
                  <Link to='/order_history' className='flex items-center gap-3 py-3 px-5 text-sm transition'>
                    <IoShirt />
                    <p>Order History</p>
                  </Link>
                  <hr />
                  <div onClick={handleLogout} className='flex items-center gap-3 py-3 px-5 text-sm transition cursor-pointer'>
                    <MdLogout />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            )
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
      
      <ChangePassword
        openChangePasswordOverlay={openChangePasswordOverlay}
        setOpenChangePasswordOverlay={setOpenChangePasswordOverlay}
      />
    </>
  )
}

export default Navbar