import { Request, Response } from 'express'
import { IReqUser } from '../utils/interface'
import Saved from '../models/Saved'

const savedCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { id, name, size, shirtColor, shirtLogo, shirtTexture, isLogoTexture, isShirtTexture } = req.body

      if (!id || !name || !size || !shirtLogo || !shirtColor || !shirtTexture) {
        res.status(400).json({ msg: 'Please provide required field to saved t-shirt' })
        return
      }

      const newShirt = new Saved({
        userId: req.user?._id,
        id,
        name,
        size,
        shirtColor,
        shirtLogo,
        shirtTexture,
        isLogoTexture,
        isShirtTexture
      })
      await newShirt.save()

      res.status(200).json({ msg: 'T-Shirt has been saved successfully', data: newShirt })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: IReqUser, res: Response) => {
    try {
      const shirt = await Saved.find({ userId: req.user?._id })

      res.status(200).json({ data: shirt })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params
      const { name, size, shirtColor, shirtLogo, shirtTexture, isLogoTexture, isShirtTexture } = req.body

      if (!name || !size || !shirtLogo || !shirtColor || !shirtTexture) {
        res.status(400).json({ msg: 'Please provide required field to update t-shirt' })
        return
      }

      const savedShirt = await Saved.findOne({ id })
      if (!savedShirt) {
        res.status(404).json({ msg: 'T-Shirt not found' })
        return
      }

      savedShirt.name = name
      savedShirt.size = size
      savedShirt.shirtColor = shirtColor
      savedShirt.shirtLogo = shirtLogo
      savedShirt.shirtTexture = shirtTexture
      savedShirt.isLogoTexture = isLogoTexture
      savedShirt.isShirtTexture = isShirtTexture
      await savedShirt.save()

      res.status(200).json({ msg: 'T-Shirt has been saved successfully', data: savedShirt })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      await Saved.findOneAndDelete({ id })

      res.status(200).json({ msg: 'T-Shirt has been removed successfully' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default savedCtrl