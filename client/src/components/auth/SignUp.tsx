import { ChangeEvent, FormEvent, useState } from 'react'
import { validEmail, validPassword } from './../../utils/validator'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { postDataAPI } from './../../utils/baseAPI'
import { toast } from 'react-toastify'
import Loader from '../general/Loader'

interface IProps {
  setSelectedAuthScreen: React.Dispatch<React.SetStateAction<string>>
}

const SignUp = ({ setSelectedAuthScreen }: IProps) => {
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignUpData({ ...signUpData, [name]: value })
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (signUpData.name && signUpData.email && signUpData.password && signUpData.passwordConfirmation) {
      if (!validEmail(signUpData.email)) {
        toast.error('Please provide valid email address')
        setLoading(false)
        return
      }

      if (!validPassword(signUpData.password)) {
        toast.error('Password confirmation should be at least 8 characters and combination of lowercase, uppercase, number, and symbol')
        setLoading(false)
        return
      }

      if (signUpData.password !== signUpData.passwordConfirmation) {
        toast.error('Password confirmation should be matched')
        setLoading(false)
        return
      }

      try {
        const res = await postDataAPI('user/register', signUpData)
        toast.success(res.data.msg)
        setSignUpData({
          name: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        })
        setSelectedAuthScreen('signIn')
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
        <h1 className='text-primary font-medium text-xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='mt-6'>
          <div className='mb-6'>
            <label htmlFor='name' className='text-sm text-neutral-800'>Name</label>
            <input type='text' id='name' name='name' value={signUpData.name} onChange={handleChange} className='w-full border border-neutral-400 text-sm text-neutral-800 p-3 outline-none mt-3 rounded-md' />
          </div>
          <div className='mb-6'>
            <label htmlFor='email' className='text-sm text-neutral-800'>Email</label>
            <input type='text' id='email' name='email' value={signUpData.email} onChange={handleChange} className='w-full border border-neutral-400 text-sm text-neutral-800 p-3 outline-none mt-3 rounded-md' />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='text-sm text-neutral-800'>Password</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={signUpData.password} onChange={handleChange} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowPassword(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <div className='mb-6'>
            <label htmlFor='passwordConfirmation' className='text-sm text-neutral-800'>Password Confirmation</label>
            <div className='w-full border border-neutral-400 flex items-center justify-between gap-4 rounded-md mt-3 p-3'>
              <input type={showPasswordConfirmation ? 'text' : 'password'} id='passwordConfirmation' name='passwordConfirmation' value={signUpData.passwordConfirmation} onChange={handleChange} className='w-full text-sm text-neutral-800 outline-none' />
              {
                showPasswordConfirmation
                ? <FaEyeSlash onClick={() => setShowPasswordConfirmation(false)} className='cursor-pointer text-neutral-400' />
                : <FaEye onClick={() => setShowPasswordConfirmation(true)} className='cursor-pointer text-neutral-400' />
              }
            </div>
          </div>
          <button className={`${loading || !signUpData.name || !signUpData.email || !signUpData.password || !signUpData.passwordConfirmation ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover cursor-pointer'} text-sm text-white w-full p-3 font-medium transition duration-200 outline-none rounded-md`}>
            {
              loading
              ? <Loader />
              : 'Sign Up'
            }
          </button>
          <p className='text-xs text-center mt-3 text-neutral-800'>Already have an account? Click <span onClick={() => setSelectedAuthScreen('signIn')} className='cursor-pointer text-blue-500 underline'>here</span></p>
        </form>
      </div>
      <div className='flex-1'>
        <img src='/images/sign-up.svg' alt='Sign Up' className='w-[90%]' />
      </div>
    </>
  )
}

export default SignUp