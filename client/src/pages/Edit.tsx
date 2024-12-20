import { useEffect, useState } from 'react'
import EditCanvas from '../components/edit/EditCanvas'
import Navbar from './../components/general/Navbar'
import { useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import state from './../store'
import EditCustomizer from '../components/edit/EditCustomizer'

const Edit = () => {
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [isLogoTexture, setIsLogoTexture] = useState(false)
  const [isShirtTexture, setIsShirtTexture] = useState(false)
  const [shirtColor, setShirtColor] = useState('')
  const [shirtLogo, setShirtLogo] = useState('')
  const [shirtTexture, setShirtTexture] = useState('')

  const { id } = useParams()

  const snap = useSnapshot(state)

  useEffect(() => {
    const getSavedData = () => {
      const savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
      state.saved = savedData || []
    }

    getSavedData()
  }, [])

  useEffect(() => {
    const getShirtById = (id: string) => {
      if (snap.saved.length > 0) {
        const data = snap.saved.find(item => item.id === id)
        if (data) {
          setIsLogoTexture(data.isLogoTexture)
          setIsShirtTexture(data.isShirtTexture)
          setShirtColor(data.shirtColor)
          setShirtLogo(data.shirtLogo)
          setShirtTexture(data.shirtTexture)
          setName(data.name)
          setSize(data.size)
        }
      }
    }

    getShirtById(`${id}`)
  }, [id, snap.saved])
  
  return (
    <main className='w-full h-screen overflow-hidden bg-home-gradient relative'>
      <Navbar />
      {
        shirtColor &&
        <EditCanvas
          isLogoTexture={isLogoTexture}
          isShirtTexture={isShirtTexture}
          shirtColor={shirtColor}
          shirtLogo={shirtLogo === 'default' ? '/images/default_texture.png' : shirtLogo}
          shirtTexture={shirtTexture === 'default' ? '/images/default_texture.png' : shirtTexture}
        />
      }
      <EditCustomizer
        id={`${id}`}
        name={name}
        setName={setName}
        size={size}
        setSize={setSize}
        isLogoTexture={isLogoTexture}
        setIsLogoTexture={setIsLogoTexture}
        isShirtTexture={isShirtTexture}
        setIsShirtTexture={setIsShirtTexture}
        shirtColor={shirtColor}
        setShirtColor={setShirtColor}
        shirtLogo={shirtLogo === 'default' ? '/images/default_texture.png' : shirtLogo}
        setShirtLogo={setShirtLogo}
        shirtTexture={shirtTexture === 'default' ? '/images/default_texture.png' : shirtTexture}
        setShirtTexture={setShirtTexture}
      />
    </main>
  )
}

export default Edit