import mongoose from 'mongoose'
import { IShippingAddress } from '../utils/interface'

const shippingAddressSchema = new mongoose.Schema<IShippingAddress>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  recipientName: {
    type: String,
    required: true,
    trim: true
  },
  recipientEmail: {
    type: String,
    required: true,
    trim: true
  },
  recipientPhoneNumber: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.model<IShippingAddress>('shippingAddress', shippingAddressSchema)