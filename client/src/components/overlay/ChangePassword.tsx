import { FormEvent, useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineClose } from 'react-icons/ai'
import { validPassword } from './../../utils/validator'
import { patchDataAPI } from './../../utils/baseAPI'
import { useSnapshot } from 'valtio'
import { toast } from 'react-toastify'
import Loader from './../general/Loader'
import state from './../../store'

interface IProps {
  openChangePasswordOverlay: boolean
  setOpenChangePasswordOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = ({ openChangePasswordOverlay, setOpenChangePasswordOverlay }: IProps) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const [loading, setLoading] = useState(false)

  const changePasswordOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const snap = useSnapshot(state)

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (currentPassword && newPassword && newPasswordConfirmation) {
      if (newPassword !== newPasswordConfirmation) {
        toast.error('Password confirmation should be matched')
        setLoading(false)
        return
      }

      if (!validPassword(newPassword)) {
        toast.error('Password should be at least 8 characters and should be combination of lowercase, uppercase, symbol, and number')
        setLoading(false)
        return
      }

      try {
        const res = await patchDataAPI('user/change_password', { oldPassword: currentPassword, newPassword }, snap.user.accessToken)
        toast.success(res.data.msg)
        setCurrentPassword('')
        setNewPassword('')
        setNewPasswordConfirmation('')
        setOpenChangePasswordOverlay(false)
      } catch (err: any) {
        toast.error(err.response.data.msg)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openChangePasswordOverlay && changePasswordOverlayRef.current && !changePasswordOverlayRef.current.contains(e.target as Node)) {
        setOpenChangePasswordOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openChangePasswordOverlay, setOpenChangePasswordOverlay])
  
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center transition duration-200 ${openChangePasswordOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-40`}>
      <div ref={changePasswordOverlayRef} className={`bg-white w-1/3 rounded-md transition duration-200 ${openChangePasswordOverlay ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-14 pointer-events-none'}`}>
        <div className='flex items-center justify-between p-4 border-b border-neutral-200'>
          <h1 className='font-medium'>Change Password</h1>
          <AiOutlineClose onClick={() => setOpenChangePasswordOverlay(false)} className='cursor-pointer' />
        </div>
        <form onSubmit={handleSubmit} className='p-5'>
          <div className='mb-6'>
            <label htmlFor='currentPassword' className='text-sm text-neutral-800'>Current Password</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showCurrentPassword ? 'text' : 'password'} id='password' name='password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showCurrentPassword
                ? <FaEyeSlash onClick={() => setShowCurrentPassword(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowCurrentPassword(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <div className='mb-6'>
            <label htmlFor='newPassword' className='text-sm text-neutral-800'>New Password</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showNewPassword
                ? <FaEyeSlash onClick={() => setShowNewPassword(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowNewPassword(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <div className='mb-6'>
            <label htmlFor='newPasswordConfirmation' className='text-sm text-neutral-800'>New Password Confirmation</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showNewPasswordConfirmation ? 'text' : 'password'} id='newPasswordConfirmation' name='newPasswordConfirmation' value={newPasswordConfirmation} onChange={e => setNewPasswordConfirmation(e.target.value)} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showNewPassword
                ? <FaEyeSlash onClick={() => setShowNewPasswordConfirmation(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowNewPasswordConfirmation(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <button className={`${loading || !currentPassword || !newPassword || !newPasswordConfirmation ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover cursor-pointer'} text-sm text-white w-full p-3 font-medium transition duration-200 outline-noen rounded-md`}>
            {
              loading
              ? <Loader />
              : 'Sign In'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword