interface IProps {
  size?: string
}

const Loader: React.FC<IProps> = ({ size }) => {
  return (
    <div className={`animate-spin ${size === '2xl' ? 'border-4 border-t-4' : 'border-2 border-t-2'} border-white ${size === 'xl' ? 'w-[60px] h-[60px]' : size === '2xl' ? 'w-[100px] h-[100px]' : 'w-[25px] h-[25px]'} rounded-full border-t-neutral-300 m-auto`} />
  )
}

export default Loader