import { AiOutlineClose } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { IoShirt } from 'react-icons/io5'
import { ICart } from '../../utils/interface'
import state from './../../store'
import { Canvas } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import StaticShirt from '../saved/StaticShirt'

interface IProps {
  loopIdx: number
  itemLength: number
  id: string
  name: string
  size: string
  shippingDaysCount: number
  price: number
  qty: number
  isSelected: boolean
  isLogoTexture: boolean
  isShirtTexture: boolean
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
}

const CartItem = ({
  loopIdx,
  itemLength,
  id,
  name,
  size,
  shippingDaysCount,
  price,
  qty,
  isSelected,
  isLogoTexture,
  isShirtTexture,
  shirtColor,
  shirtLogo,
  shirtTexture
}: IProps) => {
  const handleChangeQty = (cat: string) => {
    const prevCartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []

    const currentShirt = (prevCartData as ICart[]).find(item => item.id === id)

    if (cat === 'decrease') {
      const newQty = qty - 1

      if (newQty > 0) {
        const newCurrentShirtData = {
          ...currentShirt,
          qty: newQty
        }

        const newData = (prevCartData as ICart[]).map(item => item.id === id ? newCurrentShirtData : item)

        localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))

        state.cart = newData as ICart[]
      }
    } else if (cat === 'increase') {
      const newQty = qty + 1

      const newCurrentShirtData = {
        ...currentShirt,
        qty: newQty
      }

      const newData = (prevCartData as ICart[]).map(item => item.id === id ? newCurrentShirtData : item)

      localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))

      state.cart = newData as ICart[]
    }
  }

  const handleChangeSelectedStatus = () => {
    const prevCartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []

    const currentShirt = (prevCartData as ICart[]).find(item => item.id === id)

    const newCurrentShirtData = {
      ...currentShirt,
      isSelected: !isSelected
    }

    const newData = (prevCartData as ICart[]).map(item => item.id === id ? newCurrentShirtData : item)

    localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))

    state.cart = newData as ICart[]
  }

  const handleRemoveItem = () => {
    const prevCartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []

    const newData = (prevCartData as ICart[]).filter(item => item.id !== id)

    localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))

    state.cart = newData as ICart[]
  }

  return (
    <div className={`flex items-center gap-7 ${loopIdx !== itemLength - 1 ? 'border-b border-neutral-300' : ''}  py-5 ${loopIdx === 0 ? '!pt-0' : ''} ${loopIdx === itemLength - 1 ? '!pb-0' : ''}`}>
      <div className='w-32 h-32 rounded-md bg-neutral-100 relative'>
        <div className='absolute top-2 left-3 z-20'>
          <input type='checkbox' onChange={handleChangeSelectedStatus} checked={isSelected} className='bg-primary' />
        </div>
        {/* image */}
        <Canvas camera={{ fov: 9 }}>
          <ambientLight intensity={.5} />
          <Environment preset='city' />
          <Center>
            <StaticShirt   
              isLogoTexture={isLogoTexture}
              isShirtTexture={isShirtTexture}
              shirtColor={shirtColor}
              shirtLogo={shirtLogo}
              shirtTexture={shirtTexture}
            />
          </Center>
        </Canvas>
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <h1 className='font-medium text-neutral-800'>{name}</h1>
          <AiOutlineClose onClick={handleRemoveItem} className='cursor-pointer text-neutral-500' />
        </div>
        <div className='flex items-center gap-8 mt-3'>
          <div className='flex items-center gap-2'>
            <IoShirt className='text-gray-400 text-md' />
            <p className='text-sm'>{size}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaShippingFast className='text-gray-400 text-lg' />
            <p className='text-sm text-neutral-500'>Express delivery in <span className='font-medium text-black'>{shippingDaysCount} {shippingDaysCount > 1 ? 'days' : 'day'}</span></p>
          </div>
        </div>
        <div className='flex items-center justify-between mt-6'>
          <p className='text-lg font-semibold text-neutral-400'>$ <span className='text-neutral-800'>{(price * qty).toFixed(2)}</span></p>
          <div className='flex items-center gap-4'>
            <div onClick={() => handleChangeQty('decrease')} className='px-3 py-1 cursor-pointer rounded-md text-center bg-neutral-200 text-neutral-500 font-semibold'>-</div>
            <div className='text-sm font-medium'>{qty}</div>
            <div onClick={() => handleChangeQty('increase')} className='px-3 py-1 cursor-pointer rounded-md text-center bg-neutral-200 text-neutral-500 font-semibold'>+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem