import { useState, useEffect, useRef, FormEvent } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { uploadImages } from '../../utils/cloudinary'
import { toast } from 'react-toastify'
import Loader from '../general/Loader'

interface IProps {
  openSaveProductOverlay: boolean
  setOpenSaveProductOverlay: React.Dispatch<React.SetStateAction<boolean>>
  shirtColor: string
  isLogoTexture: boolean
  isShirtTexture: boolean
  shirtLogo: string
  shirtTexture: string
  setIsCustomize: React.Dispatch<React.SetStateAction<boolean>>
  setShirtColor: React.Dispatch<React.SetStateAction<string>>
  setIsLogoTexture: React.Dispatch<React.SetStateAction<boolean>>
  setIsShirtTexture: React.Dispatch<React.SetStateAction<boolean>>
  setShirtLogo: React.Dispatch<React.SetStateAction<string>>
  setShirtTexture: React.Dispatch<React.SetStateAction<string>>
}

const convertURLToBlob = async(url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return new File([blob], 'shirt_logo.png', { type: blob.type })
}

const SaveProduct = ({
  openSaveProductOverlay,
  setOpenSaveProductOverlay,
  shirtColor,
  isLogoTexture,
  isShirtTexture,
  shirtLogo,
  shirtTexture,
  setIsCustomize,
  setShirtColor,
  setIsLogoTexture,
  setIsShirtTexture,
  setShirtLogo,
  setShirtTexture
}: IProps) => {
  const [showSizeDetail, setShowSizeDetail] = useState(false)

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [size, setSize] = useState('')

  const saveProductOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleSaveProduct = async(e: FormEvent) => {
    e.preventDefault()

    if (name && size) {
      setLoading(true)
      let logoTextureUrl = 'default'
      let shirtTextureUrl = 'default'

      if (isLogoTexture) {
        if (shirtLogo !== '/images/default_texture.png') {
          const urlRes = await convertURLToBlob(shirtLogo)
          logoTextureUrl = await uploadImages(urlRes, 'logo')
        }
      }

      if (isShirtTexture) {
        if (shirtTexture !== '/images/default_texture.png') {
          const urlRes = await convertURLToBlob(shirtTexture)
          shirtTextureUrl = await uploadImages(urlRes, 'texture')
        }
      }

      const prevSavedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!) || []

      const newData = {
        id: uuidv4(),
        name,
        size,
        shirtColor,
        shirtLogo: logoTextureUrl,
        shirtTexture: shirtTextureUrl,
        isLogoTexture,
        isShirtTexture,
        createdAt: new Date()
      }

      localStorage.setItem('SL_SAVED_T_SHIRT', JSON.stringify([...prevSavedData, newData]))

      setOpenSaveProductOverlay(false)
      setName('')
      setSize('')
      setLoading(false)
      setIsCustomize(false)
      setShirtColor('#FF7640')
      setIsLogoTexture(true)
      setIsShirtTexture(false)
      setShirtLogo('/images/default_texture.png')
      setShirtTexture('/images/default_texture.png')
      toast.success('T-Shirt has been saved successfully')
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSaveProductOverlay && saveProductOverlayRef.current && !saveProductOverlayRef.current.contains(e.target as Node)) {
        setOpenSaveProductOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSaveProductOverlay, setOpenSaveProductOverlay])

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-30 transition duration-200 ${openSaveProductOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div ref={saveProductOverlayRef} className={`bg-white w-1/3 rounded-xl px-7 py-6 transition duration-200 delay-100 ${openSaveProductOverlay ? 'translate-y-0 pointer-events-auto opacity-100' : '-translate-y-12 pointer-events-none opacity-0'}`}>
        <div className='flex items-center justify-between'>
          <h1 className='font-medium'>Save T-Shirt</h1>
          <AiOutlineClose onClick={() => setOpenSaveProductOverlay(false)} className='text-lg cursor-pointer' />
        </div>
        <form onSubmit={handleSaveProduct} className='mt-6'>
          <div className='mb-6'>
            <label htmlFor='name' className='text-sm'>T-Shirt Name</label>
            <input type='text' id='name' name='name' value={name} onChange={e => setName(e.target.value)} autoComplete='off' className='mt-4 outline-none bg-white border border-gray-300 rounded-md text-sm px-3 py-2 w-full' />
          </div>
          <div className='mb-6'>
            <p className='text-sm'>T-Shirt Size</p>
            <div className='text-sm flex items-center gap-3 mt-4'>
              <div onClick={() => setSize('XS')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === 'XS' ? 'bg-primary font-medium text-white' : ''}`}>XS</div>
              <div onClick={() => setSize('S')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === 'S' ? 'bg-primary font-medium text-white' : ''}`}>S</div>
              <div onClick={() => setSize('M')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === 'M' ? 'bg-primary font-medium text-white' : ''}`}>M</div>
              <div onClick={() => setSize('L')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === 'L' ? 'bg-primary font-medium text-white' : ''}`}>L</div>
              <div onClick={() => setSize('XL')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === 'XL' ? 'bg-primary font-medium text-white' : ''}`}>XL</div>
              <div onClick={() => setSize('2XL')} className={`flex-1 border border-gray-300 rounded-md text-center py-2 cursor-pointer transition duration-200 hover:bg-primary hover:text-white hover:border-none hover:font-medium ${size === '2XL' ? 'bg-primary font-medium text-white' : ''}`}>2XL</div>
            </div>
            <div onClick={() => setShowSizeDetail(!showSizeDetail)} className='flex items-center gap-2 mt-3 cursor-pointer w-fit'>
              <p className='text-xs text-blue-500'>Size detail</p>
              {
                showSizeDetail
                ? <FaAngleUp className='text-xs text-blue-500' />
                : <FaAngleDown className='text-xs text-blue-500' />
              }
            </div>
            <div className={`w-full transition duration-200 origin-top ${showSizeDetail ? 'scale-y-100 pointer-events-auto h-auto mt-5' : 'scale-y-0 pointer-events-none h-0'}`}>
              <table className='w-full text-xs'>
                <thead>
                  <tr className='bg-neutral-600 text-white text-center font-medium'>
                    <td className='py-2'>Size</td>
                    <td>Chest (cm)</td>
                    <td>Waist (cm)</td>
                    <td>Length (cm)</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-center'>
                    <td className='py-2'>XS</td>
                    <td>81-86</td>
                    <td>66-71</td>
                    <td>68-71</td>
                  </tr>
                  <tr className='text-center bg-neutral-100'>
                    <td className='py-2'>S</td>
                    <td>89-94</td>
                    <td>74-79</td>
                    <td>71-74</td>
                  </tr>
                  <tr className='text-center'>
                    <td className='py-2'>M</td>
                    <td>97-102</td>
                    <td>81-86</td>
                    <td>74-76</td>
                  </tr>
                  <tr className='text-center bg-neutral-100'>
                    <td className='py-2'>L</td>
                    <td>104-109</td>
                    <td>89-94</td>
                    <td>76-79</td>
                  </tr>
                  <tr className='text-center'>
                    <td className='py-2'>XL</td>
                    <td>112-117</td>
                    <td>97-102</td>
                    <td>79-81</td>
                  </tr>
                  <tr className='text-center bg-neutral-100'>
                    <td className='py-2'>2XL</td>
                    <td>119-124</td>
                    <td>104-109</td>
                    <td>81-84</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button disabled={loading} className={`outline-none flex items-center justify-center gap-4 rounded-md text-white  w-full py-2 transition duration-200 text-sm mt-8 ${((!name || !size) || loading) ? 'cursor-not-allowed bg-gray-200' : 'bg-primary hover:bg-primary-hover'}`}>
            {
              loading
              ? <Loader />
              : 'Save'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default SaveProduct