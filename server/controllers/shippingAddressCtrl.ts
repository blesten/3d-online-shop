import { Response } from 'express'
import { IReqUser } from './../utils/interface'
import ShippingAddress from '../models/ShippingAddress'

const shippingAddressCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { country, province, city, district, postalCode, address, recipientName, recipientEmail, recipientPhoneNumber } = req.body

      if (!country || !province || !city || !district || !postalCode || !address || !recipientName || !recipientEmail || !recipientPhoneNumber) {
        res.status(400).json({ msg: 'Please provide required field to create shipping address' })
        return
      }

      const newShippingAddress = new ShippingAddress({
        userId: req.user?._id,
        country,
        province,
        city,
        district,
        postalCode,
        address,
        recipientName,
        recipientEmail,
        recipientPhoneNumber
      })
      await newShippingAddress.save()

      res.status(200).json({ msg: 'Shipping address has been saved successfully', data: newShippingAddress })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: IReqUser, res: Response) => {
    try {
      const shippingAddress = await ShippingAddress.findOne({ userId: req.user?._id })

      res.status(200).json({ data: shippingAddress })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const { country, province, city, district, postalCode, address, recipientName, recipientEmail, recipientPhoneNumber } = req.body

      if (!country || !province || !city || !district || !postalCode || !address || !recipientName || !recipientEmail || !recipientPhoneNumber) {
        res.status(400).json({ msg: 'Please provide required field to create shipping address' })
        return
      }

      const shippingAddress = await ShippingAddress.findById(id)
      if (!shippingAddress) {
        res.status(404).json({ msg: 'Shipping address not found' })
        return
      }

      shippingAddress.country = country
      shippingAddress.province = province
      shippingAddress.city = city
      shippingAddress.district = district
      shippingAddress.postalCode = postalCode
      shippingAddress.address = address
      shippingAddress.recipientName = recipientName
      shippingAddress.recipientEmail = recipientEmail
      shippingAddress.recipientPhoneNumber = recipientPhoneNumber
      await shippingAddress.save()

      res.status(200).json({ msg: 'Shipping address has been updated successfully', data: shippingAddress })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default shippingAddressCtrl