import { proxy } from 'valtio'

interface ISaved {
  id: string
  name: string
  size: string
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
  isLogoTexture: boolean
  isShirtTexture: boolean
  createdAt: Date
}

const state = proxy<{saved: ISaved[]}>({
  saved: []
})

export default state