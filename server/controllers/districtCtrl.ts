import { Request, Response } from 'express'
import City from '../models/City'
import District from '../models/District'

const districtCtrl = {
  read: async(req: Request, res: Response) => {
    try {
      const { cityId } = req.params

      const city = await City.findById(cityId)
      if (!city) {
        res.status(400).json({ msg: 'Please provide valid city ID' })
        return
      }
      
      const districts = await District.find({ cityId })

      res.status(200).json({ data: districts })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  readById: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const district = await District.findById(id)
      if (!district) {
        res.status(404).json({ msg: 'District data not found' })
        return
      }

      res.status(200).json({ district })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default districtCtrl