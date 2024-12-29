import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md"

const Footer = () => {
  return (
    <div className='flex gap-12 px-20 mb-10 mt-24 border-t border-neutral-200 pt-10'>
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
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full'>
            <FaInstagram className='text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full'>
            <FaLinkedin className='text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full'>
            <FaWhatsapp className='text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full'>
            <FaFacebook className='text-primary text-xl' />
          </div>
          <div className='cursor-pointer flex items-center justify-center border border-primary p-3 rounded-full'>
            <FaXTwitter className='text-primary text-xl' />
          </div>
        </div>
      </div>
      <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
        <p className='cursor-pointer'>Product</p>
        <p className='cursor-pointer'>Admissions</p>
        <p className='cursor-pointer'>Charting</p>
        <p className='cursor-pointer'>Billing</p>
        <p className='cursor-pointer'>Outcomes</p>
      </div>
      <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
        <p className='cursor-pointer'>Company</p>
        <p className='cursor-pointer'>Features</p>
        <p className='cursor-pointer'>Why Stitch Lab</p>
        <p className='cursor-pointer'>Blog</p>
        <p className='cursor-pointer'>testimonials</p>
      </div>
      <div className='flex-1 text-xs flex flex-col gap-4 text-neutral-700 font-medum'>
        <p className='cursor-pointer'>Support</p>
        <p className='cursor-pointer'>Contact Us</p>
        <p className='cursor-pointer'>Privacy Policy</p>
        <p className='cursor-pointer'>Terms of Service</p>
      </div>
    </div>
  )
}

export default Footer