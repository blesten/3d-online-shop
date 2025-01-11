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
  loading: boolean
  accessToken: string
  user: IUser
}

export interface ICheckout {
  _id: string
  products: ICheckoutProduct[]
  status: string
  country: string
  province: string
  city: string
  district: string
  postalCode: string
  recipientName: string
  recipientEmail: string
  recipientPhoneNumber: string
  address: string
  createdAt: string
}

export interface ICheckoutProduct {
  id: string
  qty: number
  name: string
  shippingDaysCount: number
  price: number
  size: string
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
  isLogoTexture: boolean
  isShirtTexture: boolean
}

export interface IProvince {
  _id: string
  name: string
  externalId: string
}

export interface ICity {
  _id: string
  provinceId: string
  name: string
  externalId: string
}

export interface IDistrict {
  _id: string
  cityId: string
  name: string
}