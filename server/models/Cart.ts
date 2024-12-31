import { ICart } from './../utils/interface'
import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema<ICart>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  id: {
    type: String,
    required: true,
    trim: true
  },
  qty: {
    type: Number,
    required: true
  },
  shippingDaysCount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ICart>('cart', cartSchema)