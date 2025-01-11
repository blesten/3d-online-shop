import { Request, Response } from 'express'
import Province from '../models/Province'
import City from '../models/City'

const cityCtrl = {
  create: async(req: Request, res: Response) => {
    try {
      const { provinceId, name, externalId } = req.body

      if (!provinceId || !name || !externalId) {
        res.status(400).json({ msg: 'Please provide province ID and city name' })
        return
      }

      const province = await Province.findById(provinceId)
      if (!province) {
        res.status(400).json({ msg: 'Please provide valid province ID' })
        return
      }

      const newCity = new City({
        provinceId,
        name,
        externalId
      })
      await newCity.save()
      
      res.status(200).json({ data: newCity })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: Request, res: Response) => {
    try {
      const { provinceId } = req.params

      const province = await Province.findById(provinceId)
      if (!province) {
        res.status(400).json({ msg: 'Please provide valid province ID' })
        return
      }

      const cities = await City.find({ provinceId })

      res.status(200).json({ data: cities })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  readById: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const city = await City.findById(id)
      if (!city) {
        res.status(404).json({ msg: 'City data not found' })
        return
      }

      res.status(200).json({ city })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default cityCtrl