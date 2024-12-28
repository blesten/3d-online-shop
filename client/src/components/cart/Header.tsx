const Header = () => {
  return (
    <div className='flex item-center justify-center gap-4 mt-2'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold'>
          <p>1</p>
        </div>
        <p className='text-primary font-semibold text-xs mt-3'>Cart</p>
      </div>
      <div className='w-52 h-[1px] bg-neutral-300 self-center' />
      <div className='flex flex-col items-center justify-center'>
        <div className='w-7 h-7 rounded-full bg-white text-neutral-800 text-xs flex items-center justify-center border border-neutral-400'>
          <p>2</p>
        </div>
        <p className='text-neutral-600 text-xs mt-3'>Address</p>
      </div>
      <div className='w-52 h-[1px] bg-neutral-300 self-center' />
      <div className='flex flex-col items-center justify-center'>
        <div className='w-7 h-7 rounded-full bg-white text-neutral-800 text-xs flex items-center justify-center border border-neutral-400'>
          <p>3</p>
        </div>
        <p className='text-neutral-600 text-xs mt-3'>Payment</p>
      </div>
    </div>
  )
}

export default Header