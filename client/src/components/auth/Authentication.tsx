import { useEffect, useRef } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

interface IProps {
  openAuthenticationOverlay: boolean
  setOpenAuthenticationOverlay: React.Dispatch<React.SetStateAction<boolean>>
  selectedAuthScreen: string
  setSelectedAuthScreen: React.Dispatch<React.SetStateAction<string>>
  isProgressToAddress?: boolean
}

const Authentication = ({ openAuthenticationOverlay, setOpenAuthenticationOverlay, selectedAuthScreen, setSelectedAuthScreen, isProgressToAddress }: IProps) => {
  const authenticationOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openAuthenticationOverlay && authenticationOverlayRef.current && !authenticationOverlayRef.current.contains(e.target as Node)) {
        setOpenAuthenticationOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openAuthenticationOverlay, setOpenAuthenticationOverlay])

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center ${openAuthenticationOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-50`}>
      <div ref={authenticationOverlayRef} className={`p-6 w-1/3 bg-white rounded-md transition duration-200 ${openAuthenticationOverlay ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-14 pointer-events-none'}`}>
        {
          selectedAuthScreen === 'signIn' &&
          <SignIn
            setSelectedAuthScreen={setSelectedAuthScreen}
            setOpenAuthenticationOverlay={setOpenAuthenticationOverlay}
            isProgressToAddress={isProgressToAddress}
          />
        }

        {
          selectedAuthScreen === 'signUp' &&
          <SignUp setSelectedAuthScreen={setSelectedAuthScreen} />
        }
      </div>
    </div>
  )
}

export default Authentication