interface IProps {
  currentComp: string
}

const Header = ({ currentComp }: IProps) => {
  return (
    <div className='flex item-center justify-center gap-4 mt-2'>
      <div className='flex flex-col items-center justify-center'>
        <div className={`w-7 h-7 rounded-full ${currentComp === 'front' ? 'bg-primary text-white font-semibold' : 'bg-white text-neutral-800 border border-neutral-400'} text-xs flex items-center justify-center`}>
          <p>1</p>
        </div>
        <p className={`${currentComp === 'front' ? 'text-primary font-semibold' : 'text-neutral-600'} text-xs mt-3`}>Cart</p>
      </div>
      <div className={`w-52 h-[1px] bg-neutral-300 self-center`} />
      <div className='flex flex-col items-center justify-center'>
        <div className={`w-7 h-7 rounded-full ${currentComp === 'middle' ? 'bg-primary text-white font-semibold' : 'bg-white text-neutral-800 border border-neutral-400'} text-xs flex items-center justify-center`}>
          <p>2</p>
        </div>
        <p className={`${currentComp === 'middle' ? 'text-primary font-semibold' : 'text-neutral-600'} text-xs mt-3`}>Address</p>
      </div>
      <div className='w-52 h-[1px] bg-neutral-300 self-center' />
      <div className='flex flex-col items-center justify-center'>
        <div className={`w-7 h-7 rounded-full ${currentComp === 'end' ? 'bg-primary text-white font-semibold' : 'bg-white text-neutral-800 border border-neutral-400'} text-xs flex items-center justify-center`}>
          <p>3</p>
        </div>
        <p className={`${currentComp === 'end' ? 'text-primary font-semibold' : 'text-neutral-600'} text-xs mt-3`}>Payment</p>
      </div>
    </div>
  )
}

export default Header