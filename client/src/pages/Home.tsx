import { motion, AnimatePresence } from 'framer-motion'
import { FaPaintRoller } from 'react-icons/fa6'
import { useState } from 'react'
import ShirtCanvas from './../components/home/ShirtCanvas'
import Customizer from './../components/general/Customizer'
import Navbar from './../components/general/Navbar'
import HeadInfo from '../utils/HeadInfo'

const Home = () => {
  const [isLogoTexture, setIsLogoTexture] = useState(true)
  const [isShirtTexture, setIsShirtTexture] = useState(false)
  const [shirtColor, setShirtColor] = useState('#FF7640')
  const [isCustomize, setIsCustomize] = useState(false)
  const [shirtLogo, setShirtLogo] = useState('/images/default_texture.png')
  const [shirtTexture, setShirtTexture] = useState('/images/default_texture.png')

  return (
    <>
      <HeadInfo title='Home' />
      <main className='w-full h-screen overflow-hidden bg-home-gradient relative'>
        <Navbar />
        {
          !isCustomize &&
          <div className='md:px-20 px-6 absolute top-1/2 -translate-y-1/2 z-20'>
            <AnimatePresence>
              <motion.h1 initial={{ x: -200, y: 0, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: -200, y: 0 }} className='lg:text-[5.3rem] text-[3.8rem] lg:block hidden font-bold leading-normal'><em>MADE JUST <br /> FOR YOU</em></motion.h1>
              <motion.p initial={{ x: 0, y: -100, opacity: 0 }} transition={{ delay: .2 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: 0, y: 100 }} className='max-w-2xl lg:block hidden text-gray-500 leading-loose mt-4'>
                Custom clothing tailored with precision, blending unique design and perfect fit. Each piece reflects your individuality, crafted to elevate your style with timeless quality.
              </motion.p>
              <motion.button initial={{ x: 0, y: 20, opacity: 0 }} transition={{ delay: .4 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ x: 0, y: 20 }} onClick={() => setIsCustomize(true)} className='outline-none lg:flex hidden items-center gap-4 rounded-md bg-primary text-white px-5 py-3 font-medium mt-8 transition duration-200 hover:bg-primary-hover'>
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
          !isCustomize &&
          <div className='absolute bottom-12 left-1/2 -translate-x-1/2'>
            <h1 className='text-3xl lg:hidden block font-bold leading-normal text-center'><em>MADE JUST <br /> FOR YOU</em></h1>
            <button onClick={() => setIsCustomize(true)} className='outline-none lg:hidden flex items-center gap-4 rounded-md bg-primary text-white px-5 py-3 font-medium mt-3 transition duration-200 hover:bg-primary-hover text-xs m-auto'>
              Customize
              <FaPaintRoller />
            </button>
          </div>
        }
        {
          isCustomize && 
          <Customizer
            isLogoTexture={isLogoTexture}
            setIsLogoTexture={setIsLogoTexture}
            isShirtTexture={isShirtTexture}
            setIsShirtTexture={setIsShirtTexture}
            shirtColor={shirtColor}
            setShirtColor={setShirtColor}
            setIsCustomize={setIsCustomize}
            shirtLogo={shirtLogo}
            setShirtLogo={setShirtLogo}
            shirtTexture={shirtTexture}
            setShirtTexture={setShirtTexture}
          />
        }
      </main>
    </>
  )
}

export default Home