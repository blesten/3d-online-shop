import { ICity } from './../utils/interface'
import mongoose from 'mongoose'

const citySchema = new mongoose.Schema<ICity>({
  provinceId: {
    type: mongoose.Types.ObjectId,
    ref: 'province'
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  externalId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ICity>('city', citySchema)