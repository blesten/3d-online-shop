import { IDistrict } from './../utils/interface'
import mongoose from 'mongoose'

const districtSchema = new mongoose.Schema<IDistrict>({
  cityId: {
    type: mongoose.Types.ObjectId,
    ref: 'city'
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model<IDistrict>('district', districtSchema)