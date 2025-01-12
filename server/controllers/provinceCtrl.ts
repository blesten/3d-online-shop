import { Request, Response } from 'express'
import Province from '../models/Province'

const provinceCtrl = {
  read: async(req: Request, res: Response) => {
    try {
      const provinces = await Province.find()

      res.status(200).json({ data: provinces })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  readById: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const province = await Province.findById(id)
      if (!province) {
        res.status(404).json({ msg: 'Province data not found' })
        return
      }
      
      res.status(200).json({ province })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default provinceCtrl