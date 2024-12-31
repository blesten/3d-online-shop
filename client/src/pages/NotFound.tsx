import { Link } from 'react-router-dom'
import HeadInfo from '../utils/HeadInfo'

const NotFound = () => {
  return (
    <>
      <HeadInfo title='Page Not Found' />
      <div className='flex bg-home-gradient flex-col items-center justify-center gap-10 w-screen h-screen'>
        <div className='flex items-center gap-3 text-primary font-semibold text-lg fixed top-12 left-16'>
          <img src='/images/logo.svg' alt='Stitch Lab' className='w-10' />
          <p>Stitch Lab</p>
        </div>
        <img src='/images/not_found.svg' alt='Stitch Lab' className='w-[35rem]' />
        <p className='text-xl text-neutral-700 mt-7'>Oops! It seems like you're lost</p>
        <Link to='/' className='bg-primary hover:bg-primary-hover text-sm text-white font-medium px-5 py-3 rounded-md transition duration-200'>Back to Home</Link>
      </div>
    </>
  )
}

export default NotFound