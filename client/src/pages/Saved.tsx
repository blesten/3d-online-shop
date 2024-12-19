import { MdOutlineShoppingBag, MdEdit } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Center, Environment } from '@react-three/drei'
import { LuBadgeDollarSign } from 'react-icons/lu'
import { useSnapshot } from 'valtio'
import { useEffect, useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { Canvas } from '@react-three/fiber'
import state from './../store'
import Navbar from '../components/general/Navbar'
import StaticShirt from '../components/saved/StaticShirt'
// @ts-ignore
import 'swiper/css'
import DeleteProduct from '../components/overlay/DeleteProduct'

const Saved = () => {
  const [selectedId, setSelectedId] = useState('')
  const [selectedShirtName, setSelectedShirtName] = useState('')
  const [openDeleteProductOverlay, setOpenDeleteProductOverlay] = useState(false)
  
  const snap = useSnapshot(state)

  const handleClickDelete = (id: string, shirtName: string) => {
    setSelectedId(id)
    setSelectedShirtName(shirtName)
    setOpenDeleteProductOverlay(true)
  }

  useEffect(() => {
    const getSavedData = () => {
      const savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
      state.saved = savedData || []
    }

    getSavedData()
  }, [])

  return (
    <>
      <main className='w-full h-screen overflow-hidden bg-home-gradient relative flex flex-col justify-center'>
        <div className='fixed w-full top-0'>
          <Navbar />
        </div>
        {
          snap.saved.length > 0 &&
          <Swiper
            style={{ height: '450px', width: '100%' }}
            spaceBetween={90}
            slidesPerView={snap.saved.length < 4 ? snap.saved.length : 4}
            slidesPerGroup={1}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
          >
            {
              snap.saved.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className='h-[350px]'>
                    <Canvas camera={{ fov: 8 }}>
                      <ambientLight intensity={.5} />
                      <Environment preset='city' />
                      <Center>
                        <StaticShirt 
                          isLogoTexture={item.isLogoTexture}
                          isShirtTexture={item.isShirtTexture}
                          shirtColor={item.shirtColor}
                          shirtLogo={item.shirtLogo === 'default' ? '/images/default_texture.png' : item.shirtLogo}
                          shirtTexture={item.shirtTexture === 'default' ? '/images/default_texture.png' : item.shirtTexture}
                        />
                      </Center>
                    </Canvas>
                    <h1 className='truncate text-center mt-5 font-medium text-gray-600 capitalize'>{item.name}</h1>
                    <div className='flex items-center justify-center glassmorphism rounded-lg w-fit m-auto mt-3 text-2xl gap-5 p-3'>
                      <MdOutlineShoppingBag className='text-primary cursor-pointer' />
                      <LuBadgeDollarSign className='text-green-500 cursor-pointer' />
                      <MdEdit className='text-primary cursor-pointer' />
                      <IoMdTrash onClick={() => handleClickDelete(item.id, item.name)} className='text-red-500 cursor-pointer' />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        }
      </main>

      <DeleteProduct
        openDeleteProductOverlay={openDeleteProductOverlay}
        setOpenDeleteProductOverlay={setOpenDeleteProductOverlay}
        id={selectedId}
        setId={setSelectedId}
        shirtName={selectedShirtName}
        setShirtName={setSelectedShirtName}
      />
    </>
  )
}

export default Saved