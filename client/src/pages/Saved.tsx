import { MdShoppingBag, MdOutlineShoppingBag, MdEdit } from 'react-icons/md'
import { deleteDataAPI, getDataAPI, postDataAPI } from './../utils/baseAPI'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Center, Environment } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { IoMdTrash } from 'react-icons/io'
import { Canvas } from '@react-three/fiber'
import { toast } from 'react-toastify'
import DeleteProduct from './../components/overlay/DeleteProduct'
import StaticShirt from './../components/saved/StaticShirt'
import Navbar from './../components/general/Navbar'
import state from './../store'
// @ts-ignore
import 'swiper/css'
import Loader from '../components/general/Loader'
import { IoShirt } from 'react-icons/io5'
import HeadInfo from '../utils/HeadInfo'

const Saved = () => {
  const [selectedId, setSelectedId] = useState('')
  const [selectedShirtName, setSelectedShirtName] = useState('')
  const [openDeleteProductOverlay, setOpenDeleteProductOverlay] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const snap = useSnapshot(state)

  const handleClickEdit = (id: string) => {
    navigate(`/edit/${id}`)
  }

  const handleClickDelete = (id: string, shirtName: string) => {
    setSelectedId(id)
    setSelectedShirtName(shirtName)
    setOpenDeleteProductOverlay(true)
  }

  const handleAddToCart = async(id: string) => {
    const minPrice = 50
    const maxPrice = 100
    const step = 0.2
    const randomStep = Math.floor(Math.random() * ((maxPrice - minPrice) / step + 1))
    const price = parseFloat((minPrice + randomStep * step).toFixed(2))

    const prevCartData = snap.cart

    const isShirtInCart = prevCartData.find(item => item.id === id)

    if (isShirtInCart) {
      if (snap.user.accessToken) {
        await deleteDataAPI(`cart/${id}`, snap.user.accessToken)

        state.cart = snap.cart.filter(item => item.id !== id)
      } else {
        const newData = prevCartData.filter(item => item.id !== id)

        state.cart = newData

        localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
      }

      toast.warning('T-Shirt has been removed from cart')
    } else {
      const newData = {
        id,
        qty: 1,
        shippingDaysCount: Math.floor(Math.random() * 5) + 1,
        price,
        isSelected: true
      }
  
      state.cart = [
        ...snap.cart,
        newData
      ]

      if (snap.user.accessToken) {
        await postDataAPI('cart', newData, snap.user.accessToken)
      } else {
        localStorage.setItem('SL_CART_ITEM', JSON.stringify([...prevCartData, newData]))
      }
      
      toast.success('T-Shirt has been added to cart successfully')
    }
  }

  useEffect(() => {
    const getSavedData = async() => {
      let savedData
      
      setLoading(true)
      if (snap.user.accessToken) {
        const res = await getDataAPI('saved', snap.user.accessToken)
        state.saved = res.data.data
      } else {
        savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
        state.saved = savedData || []
      }
      setLoading(false)
    }

    getSavedData()
  }, [snap.user])

  return (
    <>
      <HeadInfo title='Saved' />
      <main className={`w-full h-screen overflow-hidden ${snap.saved.length > 0 ? 'bg-home-gradient' : ''} relative flex flex-col justify-center`}>
        <Navbar isFixed={true} />
        {
          loading
          ? <Loader size='2xl' />
          : (
            <>
              {
                snap.saved.length === 0
                ? (
                  <div className='flex flex-col items-center mt-12'>
                    <div className='relative'>
                      <IoShirt className='text-gray-300 text-9xl' />
                      <div className='absolute w-3 h-[200px] rotate-45 bg-gray-300 -top-8 left-1/2 -translate-x-1/2' />
                    </div>
                    <p className='text-gray-400 mt-14'>Oops! It seems like you haven't customized any shirt yet.</p>
                  </div>
                )
                : (
                  <>
                    {
                      snap.saved.length > 0 &&
                      snap.saved.length > 4
                      ? (
                        <Swiper
                          style={{ height: '450px', width: '100%', marginTop: '25px' }}
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
                                    {
                                      snap.cart.find(it => it.id === item.id)
                                      ? <MdShoppingBag onClick={() => handleAddToCart(item.id)} className='text-primary cursor-pointer' />
                                      : <MdOutlineShoppingBag onClick={() => handleAddToCart(item.id)} className='text-primary cursor-pointer' />
                                    }
                                    <MdEdit onClick={() => handleClickEdit(item.id)} className='text-primary cursor-pointer' />
                                    <IoMdTrash onClick={() => handleClickDelete(item.id, item.name)} className='text-red-500 cursor-pointer' />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))
                          }
                        </Swiper>
                      )
                      : (
                        <div className='flex gap-20 justify-center -mt-12'>
                          {
                            snap.saved.map((item, idx) => (
                              <div key={idx} className='h-[350px]'>
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
                                  {
                                    snap.cart.find(it => it.id === item.id)
                                    ? <MdShoppingBag onClick={() => handleAddToCart(item.id)} className='text-primary cursor-pointer' />
                                    : <MdOutlineShoppingBag onClick={() => handleAddToCart(item.id)} className='text-primary cursor-pointer' />
                                  }
                                  <MdEdit onClick={() => handleClickEdit(item.id)} className='text-primary cursor-pointer' />
                                  <IoMdTrash onClick={() => handleClickDelete(item.id, item.name)} className='text-red-500 cursor-pointer' />
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </>
                )
              }
            </>
          )
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