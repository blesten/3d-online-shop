import { useRef, useState, useEffect, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaintRoller, FaImage } from 'react-icons/fa6'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoBookmarkOutline } from 'react-icons/io5'
import { SketchPicker } from 'react-color'
import ShirtCanvas from './../components/home/ShirtCanvas'
import Navbar from './../components/general/Navbar'
import Button from './../components/general/Button'
import SaveProduct from './../components/overlay/SaveProduct'

const Home = () => {
  const [isLogoTexture, setIsLogoTexture] = useState(true)
  const [isShirtTexture, setIsShirtTexture] = useState(false)
  const [shirtColor, setShirtColor] = useState('#FF7640')
  const [isCustomize, setIsCustomize] = useState(false)
  const [shirtLogo, setShirtLogo] = useState('/images/default_texture.png')
  const [shirtTexture, setShirtTexture] = useState('/images/default_texture.png')

  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false)
  const [isOpenFileSelector, setIsOpenFileSelector] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [applyImageOnLogo, setApplyImageOnLogo] = useState(false)
  const [applyImageOnTexture, setApplyImageOnTexture] = useState(false)

  const [openSaveProductOverlay, setOpenSaveProductOverlay] = useState(false)

  const colorPickerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fileSelectorRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleClickSelectImage = () => {
    fileInputRef.current.click()
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files![0])
  }

  const handleApplySelectedImage = () => {
    if ((applyImageOnLogo || applyImageOnTexture) && selectedImage) {
      if (applyImageOnLogo) {
        setShirtLogo(`${URL.createObjectURL(selectedImage)}`)
        setIsLogoTexture(true)
        if (!applyImageOnTexture) {
          setIsShirtTexture(false)
        }
      }

      if (applyImageOnTexture) {
        setShirtTexture(`${URL.createObjectURL(selectedImage)}`)
        setIsShirtTexture(true)
        if (!applyImageOnLogo) {
          setIsLogoTexture(false)
        }
      }

      setApplyImageOnLogo(false)
      setApplyImageOnTexture(false)
      setSelectedImage(null)
      setIsOpenFileSelector(false)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpenColorPicker && colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setIsOpenColorPicker(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [isOpenColorPicker])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpenFileSelector && fileSelectorRef.current && !fileSelectorRef.current.contains(e.target as Node)) {
        setIsOpenFileSelector(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [isOpenFileSelector])

  return (
    <>
      <main className='w-full h-screen overflow-hidden bg-home-gradient relative'>
        <Navbar />
        {
          !isCustomize &&
          <div className='px-20 absolute top-1/2 -translate-y-1/2 z-20'>
            <AnimatePresence>
              <motion.h1 initial={{ x: -150, y: 0, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: -150, y: 0 }} className='text-[5.3rem] font-bold leading-normal'><em>MADE JUST <br /> FOR YOU</em></motion.h1>
              <motion.p initial={{ x: 0, y: -100, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: 0, y: -100 }} className='max-w-2xl text-gray-500 leading-loose mt-4'>
                Custom clothing tailored with precision, blending unique design and perfect fit. Each piece reflects your individuality, crafted to elevate your style with timeless quality.
              </motion.p>
              <motion.button initial={{ x: 0, y: 50, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: 0, y: 50 }} onClick={() => setIsCustomize(true)} className='outline-none flex items-center gap-4 rounded-md bg-primary text-white px-5 py-3 font-medium mt-8 transition duration-200 hover:bg-primary-hover'>
                Customize
                <FaPaintRoller />
              </motion.button>
            </AnimatePresence>
          </div>
        }
        <ShirtCanvas
          isLogoTexture={isLogoTexture}
          isShirtTexture={isShirtTexture}
          shirtColor={shirtColor}
          shirtLogo={shirtLogo}
          shirtTexture={shirtTexture}
          isCustomize={isCustomize}
        />
        {
          isCustomize && 
          <div>
            <div className='absolute top-1/2 left-12 -translate-y-1/2 py-4 rounded-md glassmorphism px-3 flex flex-col items-center gap-8'>
              <IoMdArrowRoundBack onClick={() => setIsCustomize(false)} className='text-3xl text-primary cursor-pointer' />
              <div ref={colorPickerRef} className='relative'>
                <img onClick={() => setIsOpenColorPicker(!isOpenColorPicker)} src='/icons/paint.png' alt='Paint' className='w-9 h-9 cursor-pointer' />
                <div className={`absolute left-full -top-12 ml-5 duration-150 transition ${isOpenColorPicker ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <SketchPicker
                    color={shirtColor}
                    disableAlpha
                    onChange={color => setShirtColor(color.hex)}
                  />
                </div>
              </div>
              <div ref={fileSelectorRef} className='relative'>
                <img onClick={() => setIsOpenFileSelector(!isOpenFileSelector)} src='/icons/picture.png' alt='Picture' className='w-9 h-9 cursor-pointer' />
                <div className={`absolute left-full -top-28 ml-5 duration-150 transition glassmorphism w-60 h-64 rounded-lg p-3 ${isOpenFileSelector ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
                  <div onClick={handleClickSelectImage} className={`w-full h-36 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-sm`}>
                    <input ref={fileInputRef} onChange={handleChangeImage} type='file' accept='image/*' multiple={false} className='hidden' />
                    {
                      selectedImage
                      ? <img src={URL.createObjectURL(selectedImage)} className='w-32 h-32 object-contain object-center' />
                      : (
                        <div className='text-gray-500 flex flex-col items-center gap-2'>
                          <FaImage className='text-6xl' />
                          <p className='text-sm'>Select Image</p>
                        </div>
                      )
                    }
                  </div>
                  <div className='flex items-center justify-center gap-3 mt-5'>
                    <button onClick={() => setApplyImageOnLogo(!applyImageOnLogo)} className={`border border-[#ffa481] outline-none py-2 text-white rounded-md flex-1 text-sm duration-150 transition hover:bg-primary hover:border-none ${applyImageOnLogo ? 'bg-primary' : 'bg-[#ffcebb]'}`}>Logo</button>
                    <button onClick={() => setApplyImageOnTexture(!applyImageOnTexture)} className={`border border-[#ffa481] outline-none py-2 text-white rounded-md flex-1 text-sm duration-150 transition hover:bg-primary hover:border-none ${applyImageOnTexture ? 'bg-primary' : 'bg-[#ffcebb]'}`}>Texture</button>
                  </div>
                  <Button
                    text='Apply'
                    customStyles={`bg-primary w-full text-white text-sm py-2 mt-5 duration-150 transition hover:bg-primary-hover ${((applyImageOnLogo || applyImageOnTexture) && selectedImage) ? 'bg-primary' : '!bg-gray-200 hover:!bg-gray-200 cursor-not-allowed'}`}
                    handleClick={handleApplySelectedImage}
                  />
                </div>
              </div>
            </div>
            <div className='absolute top-full -mt-20 left-1/2 -translate-x-1/2 py-4 rounded-md glassmorphism px-3 flex gap-8'>
              <div>
                {
                  isLogoTexture
                  ? <img src='/icons/shirt_logo_enabled.png' alt='Paint' onClick={() => setIsLogoTexture(false)} className='w-9 h-9 cursor-pointer' />
                  : <img src='/icons/shirt_logo_disabled.png' alt='Paint' onClick={() => setIsLogoTexture(true)} className='w-9 h-9 cursor-pointer' />
                }
              </div>
              <div>
                {
                  isShirtTexture
                  ? <img src='/icons/shirt_texture_enabled.png' alt='Picture' onClick={() => setIsShirtTexture(false)} className='w-9 h-9 cursor-pointer' />
                  : <img src='/icons/shirt_texture_disabled.png' alt='Picture' onClick={() => setIsShirtTexture(true)} className='w-9 h-9 cursor-pointer' />
                }
              </div>
            </div>
            <div className='absolute top-1/2 right-12 -translate-y-1/2 py-4 rounded-md glassmorphism px-3 flex flex-col items-center gap-8'>
              <div onClick={() => setOpenSaveProductOverlay(true)}>
                <IoBookmarkOutline className='text-3xl text-primary cursor-pointer' />
              </div>
            </div>
          </div>
        }
      </main>

      <SaveProduct
        openSaveProductOverlay={openSaveProductOverlay}
        setOpenSaveProductOverlay={setOpenSaveProductOverlay}
        shirtColor={shirtColor}
        isLogoTexture={isLogoTexture}
        isShirtTexture={isShirtTexture}
        shirtLogo={shirtLogo}
        shirtTexture={shirtTexture}
      />
    </>
  )
}

export default Home