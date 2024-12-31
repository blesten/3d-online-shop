import { ChangeEvent, FormEvent, useState } from 'react'
import { getDataAPI, postDataAPI } from './../../utils/baseAPI'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { ICart, ISaved } from './../../utils/interface'
import { validEmail } from './../../utils/validator'
import { toast } from 'react-toastify'
import Loader from './../general/Loader'
import state from './../../store'

interface IProps {
  setSelectedAuthScreen: React.Dispatch<React.SetStateAction<string>>
  setOpenAuthenticationOverlay: React.Dispatch<React.SetStateAction<boolean>>
  isProgressToAddress?: boolean
}

const SignIn = ({ setSelectedAuthScreen, setOpenAuthenticationOverlay, isProgressToAddress }: IProps) => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignInData({ ...signInData, [name]: value })
  }

  const getSavedData = async(token: string) => {
    const res = await getDataAPI('saved', token)
    state.saved = res.data.data
  }

  const getCartData = async(token: string) => {
    const res = await getDataAPI('cart', token)
    state.cart = res.data.data
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (signInData.email && signInData.password) {
      if (!validEmail(signInData.email)) {
        toast.error('Please provide valid email address')
        setLoading(false)
        return
      }

      try {
        const userRes = await postDataAPI('user/login', signInData)
        state.user = {
          user: userRes.data.user,
          accessToken: userRes.data.accessToken
        }
        localStorage.setItem('SL_IS_AUTH', 'Y')
        
        const lsCart = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []
        for (let i = 0; i < lsCart.length; i++) {
          const currentItem = lsCart[i] as ICart
          await postDataAPI('cart', {
            id: currentItem.id,
            qty: currentItem.qty,
            shippingDaysCount: currentItem.shippingDaysCount,
            price: currentItem.price,
            isSelected: currentItem.isSelected
          }, userRes.data.accessToken)
        }
        localStorage.setItem('SL_CART_ITEM', JSON.stringify([]))

        const lsSaved = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!) || []
        for (let i = 0; i < lsSaved.length; i++) {
          const currentItem = lsSaved[i] as ISaved
          await postDataAPI('saved', {
            id: currentItem.id,
            name: currentItem.name,
            size: currentItem.size,
            shirtLogo: currentItem.shirtLogo,
            shirtColor: currentItem.shirtColor,
            shirtTexture: currentItem.shirtTexture,
            isLogoTexture: currentItem.isLogoTexture,
            isShirtTexture: currentItem.isShirtTexture
          }, userRes.data.accessToken)
        }
        localStorage.setItem('SL_SAVED_T_SHIRT', JSON.stringify([]))

        await getSavedData(userRes.data.accessToken)
        await getCartData(userRes.data.accessToken)
        toast.success(userRes.data.msg)
        setSignInData({ email: '', password: '' })
        setOpenAuthenticationOverlay(false)

        if (isProgressToAddress) {
          window.location.href = '/cart'
        }
      } catch (err: any) {
        toast.error(err.response.data.msg)
      } finally {
        setLoading(false)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <div className='flex-1'>
        <h1 className='text-primary font-medium text-xl'>Sign In</h1>
        <form onSubmit={handleSubmit} className='mt-6'>
          <div className='mb-6'>
            <label htmlFor='email' className='text-sm text-neutral-800'>Email</label>
            <input type='text' id='email' name='email' value={signInData.email} onChange={handleChange} className='w-full border border-neutral-400 text-sm text-neutral-800 p-3 outline-none mt-3 rounded-md' />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='text-sm text-neutral-800'>Password</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={signInData.password} onChange={handleChange} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowPassword(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <button className={`${loading || !signInData.email || !signInData.password ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover cursor-pointer'} text-sm text-white w-full p-3 font-medium transition duration-200 outline-noen rounded-md`}>
            {
              loading
              ? <Loader />
              : 'Sign In'
            }
          </button>
          <p className='text-xs text-center mt-3 text-neutral-800'>Not yet have an account? Click <span onClick={() => setSelectedAuthScreen('signUp')} className='cursor-pointer text-blue-500 underline'>here</span></p>
        </form>
      </div>
      <div className='flex-1'>
        <img src='/images/sign-in.svg' alt='Sign In' className='pointer-events-none' />
      </div>
    </>
  )
}

export default SignIn