import { ISaved } from './../utils/interface'
import mongoose from 'mongoose'

const savedSchema = new mongoose.Schema<ISaved>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  shirtColor: {
    type: String,
    required: true,
    trim: true
  },
  shirtLogo: {
    type: String,
    required: true,
    trim: true
  },
  shirtTexture: {
    type: String,
    required: true,
    trim: true
  },
  isLogoTexture: {
    type: Boolean,
    required: true
  },
  isShirtTexture: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ISaved>('saved', savedSchema)