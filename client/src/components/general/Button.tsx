import { IconType } from 'react-icons'

interface IProps {
  text: string
  Icon?: IconType
  customStyles: string
  handleClick: () => void
}

const Button = ({ text, Icon, customStyles, handleClick }: IProps) => {
  return (
    <button onClick={handleClick} className={`outline-none flex items-center justify-center gap-4 rounded-md ${customStyles}`}>
      {text}
      {Icon && <Icon />}
    </button>
  )
}

export default Button