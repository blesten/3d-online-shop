import Header from '../components/cart/Header'
import Navbar from './../components/general/Navbar'
import CartItem from '../components/cart/CartItem'
import Button from '../components/general/Button'
import { FaArrowRight } from 'react-icons/fa6'
import { GiBowTieRibbon } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import state from './../store'
import { useSnapshot } from 'valtio'
import { ICart } from '../utils/interface'

const Cart = () => {
  const [checkedStatus, setCheckedStatus] = useState(false)
  const [isGiftWrap, setIsGiftWrap] = useState(false)

  const snap = useSnapshot(state)

  const handleAllCheckbox = () => {
    const isChecked = snap.cart.every(item => item.isSelected)

    if (isChecked) {
      const prevCartData: ICart[] = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []
      const newData = (prevCartData as ICart[]).map(item => ({ ...item, isSelected: false }))
      state.cart = newData
      localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
    } else {
      const prevCartData: ICart[] = JSON.parse(localStorage.getItem('SL_CART_ITEM')!) || []
      const newData = (prevCartData as ICart[]).map(item => ({ ...item, isSelected: true }))
      state.cart = newData
      localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
    }
  }

  useEffect(() => {
    const getCartData = () => {
      const cartData = JSON.parse(localStorage.getItem('SL_CART_ITEM')!)
      state.cart = cartData || []
    }

    getCartData()
  }, [])

  useEffect(() => {
    const setChecklistStatus = () => {
      if (snap.cart.every(item => item.isSelected)) {
        setCheckedStatus(true)
      } else {
        setCheckedStatus(false)
      }
    }

    setChecklistStatus()
  }, [snap.cart])
  
  return (
    <>
      <Navbar />
      <Header />
      <div className='flex gap-20 px-20 mt-12 mb-16'>
        <div className='flex-[3]'>
          <div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <input type='checkbox' onChange={handleAllCheckbox} checked={checkedStatus} />
                <p className='font-semibold text-neutral-800 text-sm'>{snap.cart.filter(item => item.isSelected).length}/{snap.cart.length} {snap.cart.length > 1 ? 'items' : 'item'} selected</p>
              </div>
              <div>
                <p className='text-neutral-500 text-xs font-medium cursor-pointer'>Remove</p>
              </div>
            </div>
            <div className='w-full border border-neutral-200 rounded-lg p-5 mt-4'>
              {
                snap.cart.map((item, idx) => {
                  const shirtData = snap.saved.find(it => it.id === item.id)
                  
                  return (
                    <CartItem
                      key={idx}
                      loopIdx={idx}
                      itemLength={snap.cart.length}
                      id={item.id}
                      name={`${shirtData?.name}`}
                      price={item.price}
                      qty={item.qty}
                      size={`${shirtData?.size}`}
                      shippingDaysCount={item.shippingDaysCount}
                      isSelected={item.isSelected}
                      // down
                      isLogoTexture={shirtData?.isLogoTexture as boolean}
                      isShirtTexture={shirtData?.isShirtTexture as boolean}
                      shirtColor={shirtData?.shirtColor as string}
                      shirtLogo={shirtData?.shirtLogo === 'default' ? '/images/default_texture.png' : shirtData?.shirtLogo as string}
                      shirtTexture={shirtData?.shirtTexture === 'default' ? '/images/default_texture.png' : shirtData?.shirtTexture as string}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='flex-[2]'>
          <div className='mb-8'>
            <h1 className='font-semibold text-neutral-900'>Gifting</h1>
            <div className='mt-5 rounded-lg border border-neutral-50 p-4 bg-[rgba(255,118,64,.1)] relative'>
              <h1 className='text-neutral-800 font-bold text-sm'>Buying for a loved one?</h1>
              <p className='text-gray-400 text-xs font-semibold mt-3'>Make it a gift with only $20 rate</p>
              <p onClick={() => setIsGiftWrap(!isGiftWrap)} className='cursor-pointer text-primary font-semibold text-sm mt-4'>{isGiftWrap ? 'Remove' : 'Add'} gift wrap</p>
              <div className='absolute w-2 h-full bg-[rgba(255,118,64,.2)] top-0 right-12' />
              <GiBowTieRibbon className='absolute top-4 right-7 text-primary text-5xl' />
            </div>
          </div>
          <div>
            <h1 className='font-semibold text-neutral-900'>Price Details</h1>
            <div className='mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
              <p className='font-medium text-neutral-900 text-sm'>{snap.cart.reduce((acc, item) => acc + item.qty , isGiftWrap ? 1 : 0)} {snap.cart.reduce((acc, item) => acc + item.qty , isGiftWrap ? 1 : 0) > 1 ? 'Items' : 'Item'}</p>
              {
                snap.cart.filter(item => item.isSelected).map((item, idx) => {
                  const shirtData = snap.saved.find(it => it.id === item.id)

                  return (
                    <div className={`flex items-center justify-between ${idx === 0 ? 'mt-5' : 'mt-3'}`}>
                      <p className='text-xs text-gray-400 font-semibold'>{item.qty}x {shirtData?.name} T-Shirt</p>
                      <p className='text-neutral-700 text-sm font-medium'>${(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  )
                })
              }
              {
                isGiftWrap &&
                <div className='flex items-center justify-between mt-3'>
                  <p className='text-xs text-gray-400 font-semibold'>Gift Wrap</p>
                  <p className='text-neutral-700 text-sm font-medium'>$20.00</p>
                </div>
              }
              <div className='flex items-center justify-between mt-3'>
                <p className='text-xs text-gray-400 font-semibold'>Delivery Charges</p>
                <p className='text-neutral-700 text-sm font-medium'>Free Delivery</p>
              </div>
              <hr className='my-4' />
              <div className='flex items-center justify-between text-sm font-semibold'>
                <p className=''>Total Amount</p>
                <p>${snap.cart.filter(item => item.isSelected).reduce((acc, item) => acc + (item.qty * item.price), isGiftWrap ? 20 : 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <Button
            text='Place Order'
            Icon={FaArrowRight}
            customStyles={`${snap.cart.filter(item => item.isSelected).length < 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover cursor-pointer'} text-white text-sm font-semibold w-full py-3 transition duration-200 mt-6`}
            handleClick={() => {}}
          />
        </div>
      </div>
    </>
  )
}

export default Cart