import { Link } from 'react-router-dom'
import HeadInfo from '../utils/HeadInfo'

const NotFound = () => {
  return (
    <>
      <HeadInfo title='Page Not Found' />
      <div className='flex bg-home-gradient flex-col items-center justify-center gap-10 w-screen h-screen'>
        <Link to='/' className='flex items-center gap-3 text-primary font-semibold text-lg fixed top-10 md:left-16 left-6'>
          <img src='/images/logo.svg' alt='Stitch Lab' className='w-10' />
          <p>Stitch Lab</p>
        </Link>
        <img src='/images/not_found.svg' alt='Stitch Lab' className='md:w-[35rem] w-[25rem]' />
        <p className='text-xl text-neutral-700 mt-7'>Oops! It seems like you're lost</p>
        <Link to='/' className='bg-primary hover:bg-primary-hover text-sm text-white font-medium px-5 py-3 rounded-md transition duration-200'>Back to Home</Link>
      </div>
    </>
  )
}

export default NotFound