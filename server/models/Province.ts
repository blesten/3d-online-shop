import { IProvince } from './../utils/interface'
import mongoose from 'mongoose'

const provinceSchema = new mongoose.Schema<IProvince>({
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

export default mongoose.model<IProvince>('province', provinceSchema)