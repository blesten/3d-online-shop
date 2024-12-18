import { motion, AnimatePresence } from 'framer-motion'
import { FaPaintRoller } from 'react-icons/fa6'
import { useState } from 'react'
import ShirtCanvas from './../components/home/ShirtCanvas'
import Navbar from './../components/general/Navbar'
import Customizer from '../components/general/Customizer'

const Home = () => {
  const [isLogoTexture, setIsLogoTexture] = useState(true)
  const [isShirtTexture, setIsShirtTexture] = useState(false)
  const [shirtColor, setShirtColor] = useState('#FF7640')
  const [isCustomize, setIsCustomize] = useState(false)
  const [shirtLogo, setShirtLogo] = useState('/images/default_texture.png')
  const [shirtTexture, setShirtTexture] = useState('/images/default_texture.png')

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