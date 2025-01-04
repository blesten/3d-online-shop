import { BsExclamationCircleFill } from 'react-icons/bs'
import { useEffect, useRef } from 'react'
import { deleteDataAPI } from './../../utils/baseAPI'
import { useSnapshot } from 'valtio'
import { ISaved } from './../../utils/interface'
import { toast } from 'react-toastify'
import Button from './../general/Button'
import state from './../../store'

interface IProps {
  openDeleteProductOverlay: boolean
  setOpenDeleteProductOverlay: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  shirtName: string
  setShirtName: React.Dispatch<React.SetStateAction<string>>
}

const DeleteProduct = ({
  openDeleteProductOverlay,
  setOpenDeleteProductOverlay,
  id,
  setId,
  shirtName,
  setShirtName
}: IProps) => {
  const snap = useSnapshot(state)

  const deleteProductOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleDeleteProduct = async() => {
    if (snap.user.accessToken) {
      await deleteDataAPI(`saved/${id}`, snap.user.accessToken)
      await deleteDataAPI(`cart/${id}`, snap.user.accessToken)
      state.saved = snap.saved.filter(item => item.id !== id)
      state.cart = snap.cart.filter(item => item.id !== id)
    } else {
      const prevData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!) || []
      const newData = (prevData as ISaved[]).filter(item => item.id !== id)
      localStorage.setItem('SL_SAVED_T_SHIRT', JSON.stringify(newData))
      state.saved = newData
      state.cart = snap.cart.filter(item => item.id !== id)
      localStorage.setItem('SL_CART_ITEM', JSON.stringify(snap.cart.filter(item => item.id !== id)))
    }

    setId('')
    setShirtName('')
    setOpenDeleteProductOverlay(false)

    toast.success('T-Shirt has been removed successfully')
  }

  const handleClose = () => {
    setId('')
    setShirtName('')
    setOpenDeleteProductOverlay(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDeleteProductOverlay && deleteProductOverlayRef.current && !deleteProductOverlayRef.current.contains(e.target as Node)) {
        setId('')
        setShirtName('')
        setOpenDeleteProductOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  })

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-30 transition duration-200 ${openDeleteProductOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} px-6`}>
      <div ref={deleteProductOverlayRef} className={`bg-white xl:w-1/3 lg:w-1/2 md:w-2/3 w-full rounded-xl px-7 py-6 transition duration-200 delay-100 ${openDeleteProductOverlay ? 'translate-y-0 pointer-events-auto opacity-100' : 'opacity-0 pointer-events-none -translate-y-12'}`}>
        <BsExclamationCircleFill className='text-orange-400 m-auto text-9xl' />
        <h1 className='text-center mt-6'>Are you sure to delete <span className='font-medium'>{shirtName}</span> T-Shirt?</h1>
        <div className='flex items-center justify-center gap-7 mt-8'>
          <Button
            text='No, I&apos;m not'
            customStyles='!bg-gray-300 hover:!bg-gray-300 text-sm text-neutral-600 px-6 py-3'
            handleClick={handleClose}
          />
          <Button
            text='Yes, I&apos;m sure'
            customStyles='!bg-red-500 hover:!bg-red-600 text-sm text-white px-6 py-3'
            handleClick={handleDeleteProduct}
          />
        </div>
      </div>
    </div>
  )
}

export default DeleteProduct