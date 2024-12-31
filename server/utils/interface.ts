import { ObjectId, Date } from 'mongoose'
import { Request } from 'express'

export interface IGeneralField {
  _id: string
  createdAt: Date
  updatedAt: Date
  _doc?: any
}

export interface IDecodedToken {
  id: string
}

export interface IUser extends IGeneralField {
  name: string
  avatar: string
  email: string
  phoneNumber: string
  password: string
}

export interface IReqUser extends Request {
  user?: IUser
}

export interface ISaved extends IGeneralField {
  userId: ObjectId
  id: string
  name: string
  size: string
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
  isLogoTexture: boolean
  isShirtTexture: boolean
}

export interface ICart extends IGeneralField {
  userId: ObjectId
  id: string
  qty: number
  shippingDaysCount: number
  price: number
  isSelected: boolean
}

export interface IShippingAddress extends IGeneralField {
  userId: ObjectId
  country: string
  province: string
  city: string
  district: string
  postalCode: string
  address: string
  recipientName: string
  recipientEmail: string
  recipientPhoneNumber: string
}

export interface ICheckout extends IGeneralField {
  userId: ObjectId
  products: ICheckoutProduct[]
  status: string
  stripeSessionId: string
  country: string
  province: string
  city: string
  district: string
  postalCode: string
  recipientName: string
  recipientEmail: string
  recipientPhoneNumber: string
  address: string
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