import { MdShoppingBag , MdOutlineShoppingBag } from 'react-icons/md'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex items-center justify-between px-20 py-8'>
      <Link to='/' className='flex items-center gap-5 outline-none'>
        <img src='/images/logo.svg' alt='Stanley Claudius - 3D Online Shop Sample Works'  className='w-10 h-10' />
        <h1 className='text-primary font-semibold text-lg'>Stitch Lab</h1>
      </Link>
      <div className='flex items-center gap-9'>
        <Link to='/saved'>
          {
            pathname === '/saved'
            ? <IoBookmark className='text-2xl text-primary cursor-pointer' />
            : <IoBookmarkOutline className='text-2xl text-primary cursor-pointer' />
          }
        </Link>
        <MdOutlineShoppingBag className='text-2xl text-primary cursor-pointer' />
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