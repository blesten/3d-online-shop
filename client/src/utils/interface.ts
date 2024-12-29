export interface ISaved {
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

export interface ICart {
  id: string
  qty: number
  shippingDaysCount: number
  price: number
  isSelected: boolean
}

export interface IUser {
  name: string
  avatar: string
  email: string
  password: string
}

export interface IUserState {
  accessToken: string
  user: IUser
}