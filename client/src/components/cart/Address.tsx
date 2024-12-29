import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import Button from './../general/Button'
import { ChangeEvent, FormEvent, useState } from 'react'

interface IProps {
  setCurrentComp: React.Dispatch<React.SetStateAction<string>>
}

const Address = ({ setCurrentComp }: IProps) => {
  const [addressData, setAddressData] = useState({
    country: '',
    province: '',
    city: '',
    district: '',
    postalCode: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'phoneNumber') {
      let newVal = value
      
      if (!newVal.startsWith('+')) {
        newVal = '+' + newVal.replace(/[^0-9]/g, '')
      }

      newVal = newVal.replace(/^(\+\d*)[^0-9]/, '$1')

      if (newVal.startsWith('+0')) {
        newVal = '+'
      }

      setAddressData({ ...addressData, phoneNumber: newVal })
    } else
      setAddressData({ ...addressData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (addressData.country && addressData.province && addressData.city && addressData.district && addressData.postalCode && addressData.name && addressData.email && addressData.phoneNumber && addressData.address) {
      localStorage.setItem('SL_ADDRESS', JSON.stringify(addressData))
    }

    setCurrentComp('end')
  }

  return (
    <div className='px-20 mt-12 mb-16 mx-auto w-1/2'>
      <div onClick={() => setCurrentComp('front')} className='text-primary flex items-center gap-3 cursor-pointer w-fit'>
        <FaArrowLeft />
        <p className='text-sm font-semibold'>Back</p>
      </div>
      <form onSubmit={handleSubmit} className='mt-8'>
        <div className='mb-7'>
          <label htmlFor='country' className='text-sm font-medium'>Country</label>
          <select name='country' id='country' value={addressData.country} onChange={handleChange} className='border outline-none w-full rounded-md p-3 text-sm mt-3'>
            <option value=''>Select country</option>
            <option value='Indonesia'>Indonesia</option>
          </select>
        </div>
        <div className='mb-7'>
          <label htmlFor='province' className='text-sm font-medium'>Province</label>
          <select name='province' id='province' value={addressData.province} onChange={handleChange} className='border outline-none w-full rounded-md p-3 text-sm mt-3'>
            <option value=''>Select province</option>
            <option value='Jakarta'>Jakarta</option>
          </select>
        </div>
        <div className='mb-7'>
          <label htmlFor='city' className='text-sm font-medium'>City</label>
          <select name='city' id='city' value={addressData.city} onChange={handleChange} className='border outline-none w-full rounded-md p-3 text-sm mt-3'>
            <option value=''>Select city</option>
            <option value='North Jakarta'>North Jakarta</option>
          </select>
        </div>
        <div className='mb-7'>
          <label htmlFor='district' className='text-sm font-medium'>District</label>
          <select name='district' id='district' value={addressData.district} onChange={handleChange} className='border outline-none w-full rounded-md p-3 text-sm mt-3'>
            <option value=''>Select district</option>
            <option value='Kelapa Gading'>Kelapa Gading</option>
          </select>
        </div>
        <div className='mb-7'>
          <label htmlFor='postalCode' className='text-sm font-medium'>Postal Code</label>
          <input type='text' id='postalCode' name='postalCode' value={addressData.postalCode.replace(/\D/g, '')} onChange={handleChange} className='w-full border outline-none rounded-md p-3 text-sm mt-3' />
        </div>
        <div className='mb-7'>
          <label htmlFor='name' className='text-sm font-medium'>Recipient Name</label>
          <input type='text' id='name' name='name' value={addressData.name} onChange={handleChange} className='w-full border outline-none rounded-md p-3 text-sm mt-3' />
        </div>
        <div className='mb-7'>
          <label htmlFor='email' className='text-sm font-medium'>Recipient Email</label>
          <input type='email' id='email' name='email' value={addressData.email} onChange={handleChange} className='w-full border outline-none rounded-md p-3 text-sm mt-3' />
        </div>
        <div className='mb-7'>
          <label htmlFor='phoneNumber' className='text-sm font-medium'>Reachable Phone Number</label>
          <input type='text' id='phoneNumber' name='phoneNumber' value={addressData.phoneNumber} onChange={handleChange} className='w-full border outline-none rounded-md p-3 text-sm mt-3' placeholder='e.g. +628123' />
        </div>
        <div className='mb-8'>
          <label htmlFor='address' className='text-sm font-medium'>Address</label>
          <textarea id='address' name='address' value={addressData.address} onChange={handleChange} className='w-full border outline-none rounded-md p-3 text-sm mt-3 resize-none h-36' />
        </div>
        <Button
          customStyles={`${!addressData.country || !addressData.province || !addressData.city || !addressData.district || !addressData.postalCode || !addressData.name || !addressData.email || !addressData.phoneNumber || !addressData.address ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover cursor-pointer'} transition duration-200 text-white w-full py-3 text-sm font-semibold`}
          handleClick={() => {}}
          text='Proceed to Payment'
          Icon={FaArrowRight}
        />
      </form>
    </div>
  )
}

export default Address