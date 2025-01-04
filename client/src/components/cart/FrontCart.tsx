import { deleteDataAPI, patchDataAPI } from './../../utils/baseAPI'
import { useEffect, useState } from 'react'
import { GiBowTieRibbon } from 'react-icons/gi'
import { FaArrowRight } from 'react-icons/fa6'
import { useSnapshot } from 'valtio'
import Authentication from './../auth/Authentication'
import CartItem from './CartItem'
import Button from './../general/Button'
import state from './../../store'

interface IProps {
  setCurrentComp: React.Dispatch<React.SetStateAction<string>>
}

const FrontCart = ({ setCurrentComp }: IProps) => {
  const [checkedStatus, setCheckedStatus] = useState(false)
  const [isGiftWrap, setIsGiftWrap] = useState(false)
  const [openAuthenticationOverlay, setOpenAuthenticationOverlay] = useState(false)
  const [selectedAuthScreen, setSelectedAuthScreen] = useState('signIn')

  const snap = useSnapshot(state)

  const handlePlaceOrderBtn = () => {
    if (snap.cart.filter(item => item.isSelected).length > 0) {
      if (snap.user.accessToken) {
        setCurrentComp('middle')
      } else {
        setOpenAuthenticationOverlay(true)
      }
    }
  }

  const handleRemoveCheckedItem = async() => {
    const prevCartData = snap.cart
    const newData = prevCartData.filter(item => !item.isSelected)
    const deletedData = prevCartData.filter(item => item.isSelected)
    state.cart = newData

    if (snap.user.accessToken) {
      for (let i = 0; i < deletedData.length; i++) {
        await deleteDataAPI(`cart/${deletedData[i].id}`, snap.user.accessToken)
      }
    } else {
      localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
    }
  }

  const handleAllCheckbox = async() => {
    const isChecked = snap.cart.every(item => item.isSelected)

    if (isChecked) {
      const prevCartData = snap.cart
      const newData = prevCartData.map(item => ({ ...item, isSelected: false }))
      state.cart = newData

      if (snap.user.accessToken) {
        await patchDataAPI('cart/all', { isSelected: false }, snap.user.accessToken)
      } else {
        localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
      }
    } else {
      const prevCartData = snap.cart
      const newData = prevCartData.map(item => ({ ...item, isSelected: true }))
      state.cart = newData

      if (snap.user.accessToken) {
        await patchDataAPI('cart/all', { isSelected: true }, snap.user.accessToken)
      } else {
        localStorage.setItem('SL_CART_ITEM', JSON.stringify(newData))
      }
    }
  }

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
      <div className='flex md:flex-row flex-col md:gap-20 gap-12 md:px-20 px-6 mt-14 mb-16'>
        <div className='flex-[3]'>
          <div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <input type='checkbox' onChange={handleAllCheckbox} checked={checkedStatus} />
                <p className='font-semibold text-neutral-800 text-sm'>{snap.cart.filter(item => item.isSelected).length}/{snap.cart.length} {snap.cart.length > 1 ? 'items' : 'item'} selected</p>
              </div>
              <div>
                <p onClick={handleRemoveCheckedItem} className='text-neutral-500 text-xs font-medium cursor-pointer'>Remove</p>
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
          {/* <div className='mb-8'>
            <h1 className='font-semibold text-neutral-900'>Gifting</h1>
            <div className='mt-5 rounded-lg border border-neutral-50 p-4 bg-[rgba(255,118,64,.1)] relative'>
              <h1 className='text-neutral-800 font-bold text-sm'>Buying for a loved one?</h1>
              <p className='text-gray-400 text-xs font-semibold mt-3'>Make it a gift with only $20 rate</p>
              <p onClick={() => setIsGiftWrap(!isGiftWrap)} className='cursor-pointer text-primary font-semibold text-sm mt-4'>{isGiftWrap ? 'Remove' : 'Add'} gift wrap</p>
              <div className='absolute w-2 h-full bg-[rgba(255,118,64,.2)] top-0 right-12' />
              <GiBowTieRibbon className='absolute top-4 right-7 text-primary text-5xl' />
            </div>
          </div> */}
          <div className='sticky top-32'>
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
              handleClick={handlePlaceOrderBtn}
            />
          </div>
        </div>
      </div>
      
      <Authentication
        openAuthenticationOverlay={openAuthenticationOverlay}
        setOpenAuthenticationOverlay={setOpenAuthenticationOverlay}
        selectedAuthScreen={selectedAuthScreen}
        setSelectedAuthScreen={setSelectedAuthScreen}
        isProgressToAddress={true}
      />
    </>
  )
}

export default FrontCart