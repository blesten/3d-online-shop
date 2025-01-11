import { Center, Environment } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ICheckout } from './../../utils/interface'
import { Canvas } from '@react-three/fiber'
import StaticShirt from './../saved/StaticShirt'
import { getDataAPI } from '../../utils/baseAPI'

interface IProps {
  openOrderDetailOverlay: boolean
  setOpenOrderDetailOverlay: React.Dispatch<React.SetStateAction<boolean>>
  selectedOrder: Partial<ICheckout>
}

const OrderDetail = ({ openOrderDetailOverlay, setOpenOrderDetailOverlay, selectedOrder }: IProps) => {
  const [provinceName, setProvinceName] = useState('')
  const [cityName, setCityName] = useState('')
  const [districtName, setDistrictName] = useState('')
  
  const orderDetailOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const getProvince = async(id: string) => {
      const res = await getDataAPI(`province/${id}`)
      setProvinceName(res.data.province.name)
    }

    if (selectedOrder.province)
      getProvince(selectedOrder.province)
  }, [selectedOrder.province])

  useEffect(() => {
    const getCity = async(id: string) => {
      const res = await getDataAPI(`city/id/${id}`)
      setCityName(res.data.city.name)
    }

    if (selectedOrder.city)
      getCity(selectedOrder.city)
  }, [selectedOrder.city])

  useEffect(() => {
    const getDistrict = async(id: string) => {
      const res = await getDataAPI(`district/id/${id}`)
      setDistrictName(res.data.district.name)
    }

    if (selectedOrder.district)
      getDistrict(selectedOrder.district)
  }, [selectedOrder.district])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openOrderDetailOverlay && orderDetailOverlayRef.current && !orderDetailOverlayRef.current.contains(e.target as Node)) {
        setOpenOrderDetailOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.addEventListener('mousedown', checkIfClickedOutside)
  }, [openOrderDetailOverlay, setOpenOrderDetailOverlay])

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center transition duration-200 ${openOrderDetailOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} px-6`}>
      <div ref={orderDetailOverlayRef} className={`bg-white lg:w-1/2 md:w-2/3 w-full rounded-md transition duration-200 ${openOrderDetailOverlay ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-14 pointer-events-none'}`}>
        <div className='flex items-center justify-between border-b border-neutral-200 px-5 py-3'>
          <h1 className='font-medium'>Order Detail</h1>
          <AiOutlineClose onClick={() => setOpenOrderDetailOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='p-5'>
          <div className='mb-9'>
            <h1 className='font-medium text-sm'>Products</h1>
            <div className='mt-4 flex flex-col gap-5'>
              {
                selectedOrder.products!.map(item => (
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 h-20 bg-neutral-200 rounded-md'>
                        <Canvas camera={{ fov: 9 }}>
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
                      </div>
                      <div>
                        <h1 className='text-sm font-medium'>{item.name}</h1>
                        <p className='text-neutral-600 text-xs mt-2'>Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className='font-semibold'>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="mb-9">
            <h1 className='font-medium text-sm'>Shippping Address</h1>
            <p className='text-neutral-600 text-xs mt-5'>
              {selectedOrder.address}
            </p>
            <p className='text-neutral-600 text-xs mt-2'>
              {selectedOrder.country}, {provinceName}, {cityName}, {districtName}, {selectedOrder.postalCode}
            </p>
            <p className='text-neutral-600 text-xs mt-2'>
              {selectedOrder.recipientName}, {selectedOrder.recipientPhoneNumber}, {selectedOrder.recipientEmail}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='font-medium textsm'>Net Amount</h1>
            <p className='font-semibold'>
              ${(selectedOrder.products!.reduce((acc, item) => (item.qty * item.price) + acc, 0)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail