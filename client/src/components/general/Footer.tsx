import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const Footer = () => {
  return (
    <div className='flex gap-12 md:px-20 px-6 pb-10 md:mt-24 mt-16 pt-10 bg-neutral-50 md:flex-row flex-col'>
      <div className='flex-[3]'>
        <div className='flex items-center gap-3'>
          <img src='/images/logo.svg' alt='Stitch Lab' className='w-10' />
          <h1 className='font-semibold text-lg text-primary'>Stitch Lab</h1>
        </div>
        <div className='mt-9'>
          <div className='flex items-center gap-3 text-neutral-600 mb-4'>
            <MdLocationOn className='text-lg' />
            <p className='text-sm'>ABC St. No. 123, South Carolina</p>
          </div>
          <div className='flex items-center gap-3 text-neutral-600 mb-4'>
            <MdEmail className='text-lg' />
            <p className='text-sm'>stitchlab@testmail.com</p>
          </div>
          <div className='flex items-center gap-3 text-neutral-600'>
            <MdPhone className='text-lg' />
            <p className='text-sm'>123-456-789</p>
          </div>
        </div>
        <div className='mt-9 flex items-center gap-5'>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full hover:bg-primary group transition duration-150'>
            <FaInstagram className='group-hover:text-white text-primary text-xl transition duration-150' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full hover:bg-primary group transition duration-150'>
            <FaLinkedin className='group-hover:text-white transition duration-150 text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full hover:bg-primary group transition duration-150'>
            <FaWhatsapp className='group-hover:text-white transition duration-150 text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full hover:bg-primary group transition duration-150'>
            <FaFacebook className='group-hover:text-white transition duration-150 text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full hover:bg-primary group transition duration-150'>
            <FaXTwitter className='group-hover:text-white transition duration-150 text-primary text-xl' />
          </div>
        </div>
      </div>
      <div className='flex-[3] flex gap-12'>
        <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
          <p className='cursor-pointer w-fit'>Product</p>
          <p className='cursor-pointer w-fit'>Admissions</p>
          <p className='cursor-pointer w-fit'>Charting</p>
          <p className='cursor-pointer w-fit'>Billing</p>
          <p className='cursor-pointer w-fit'>Outcomes</p>
        </div>
        <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
          <p className='cursor-pointer w-fit'>Company</p>
          <p className='cursor-pointer w-fit'>Features</p>
          <p className='cursor-pointer w-fit'>Why Stitch Lab</p>
          <p className='cursor-pointer w-fit'>Blog</p>
          <p className='cursor-pointer w-fit'>testimonials</p>
        </div>
        <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
          <p className='cursor-pointer w-fit'>Support</p>
          <p className='cursor-pointer w-fit'>Contact Us</p>
          <p className='cursor-pointer w-fit'>Privacy Policy</p>
          <p className='cursor-pointer w-fit'>Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default Footer