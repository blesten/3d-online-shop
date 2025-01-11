import { MdShoppingBag , MdOutlineShoppingBag, MdLogout } from 'react-icons/md'
import { IoBookmark, IoBookmarkOutline, IoShirt } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import { getDataAPI } from './../../utils/baseAPI'
import { BsKeyFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import ChangePassword from './../overlay/ChangePassword'
import Authentication from './../auth/Authentication'
import Button from './Button'
import state from './../../store'

interface IProps {
  isFixed?: boolean
}

const Navbar = ({ isFixed }: IProps) => {
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
      <div className={`flex items-center justify-between md:px-20 px-6 py-8 z-40 ${isFixed ? 'fixed top-0 w-full left-0' : ''}`}>
        <Link to='/' className='flex items-center gap-5 outline-none'>
          <img src='/images/logo.svg' alt='Stanley Claudius - 3D Online Shop Sample Works'  className='w-10 h-10' />
          <h1 className='md:block hidden text-primary font-semibold text-lg'>Stitch Lab</h1>
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
                <div className={`shadow-md absolute top-full mt-2 right-0 w-[200px] bg-white rounded-md border border-neutral-100 z-40 transition duration-100 origin-top ${openProfileDropdown ? 'scale-y-100 pointer-events-auto' : 'scale-y-0 pointer-events-none'}`}>
                  <div onClick={() => setOpenChangePasswordOverlay(true)} className='flex items-center gap-3 py-3 cursor-pointer px-5 text-sm transition hover:bg-gray-100 rounded-t-md'>
                    <BsKeyFill className='text-orange-500' />
                    <p>Change Password</p>
                  </div>
                  <Link to='/order_history' className='flex items-center gap-3 py-3 px-5 text-sm transition outline-none hover:bg-gray-100'>
                    <IoShirt className='text-green-400' />
                    <p>Order History</p>
                  </Link>
                  <hr />
                  <div onClick={handleLogout} className='flex items-center gap-3 py-3 px-5 text-sm transition cursor-pointer hover:bg-gray-100 rounded-b-md'>
                    <MdLogout className='text-red-500' />
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