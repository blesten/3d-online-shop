import { ICheckout } from './../utils/interface'
import mongoose from 'mongoose'

const checkoutSchema = new mongoose.Schema<ICheckout>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  products: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
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
      size: {
        type: String,
        required: true
      },
      shirtColor: {
        type: String,
        required: true
      },
      shirtLogo: {
        type: String,
        required: true
      },
      shirtTexture: {
        type: String,
        required: true
      },
      isLogoTexture: {
        type: Boolean,
        required: true
      },
      isShirtTexture: {
        type: Boolean,
        required: true
      }
    }
  ],
  status: {
    type: String,
    default: 'Order Placed',
    enum: ['Order Placed', 'Payment Success', 'Payment Failed', 'On Delivery', 'Delivered']
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  recipientName: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true
  },
  recipientPhoneNumber: {
    type: String,
    required: true
  },
  stripeSessionId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

export default mongoose.model<ICheckout>('checkout', checkoutSchema)