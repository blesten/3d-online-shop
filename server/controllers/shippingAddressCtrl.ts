import { Response } from 'express'
import { IReqUser } from './../utils/interface'
import ShippingAddress from './../models/ShippingAddress'

const shippingAddressCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { country, province, city, district, postalCode, address, recipientName, recipientEmail, recipientPhoneNumber } = req.body

      if (!country || !province || !city || !district || !postalCode || !address || !recipientName || !recipientEmail || !recipientPhoneNumber) {
        res.status(400).json({ msg: 'Please provide required field to create shipping address' })
        return
      }

      const isAddressExists = await ShippingAddress.findOne({ userId: req.user?._id })

      if (isAddressExists) {
        isAddressExists.country = country
        isAddressExists.province = province
        isAddressExists.city = city
        isAddressExists.district = district
        isAddressExists.postalCode = postalCode
        isAddressExists.address = address
        isAddressExists.recipientName = recipientName
        isAddressExists.recipientEmail = recipientEmail
        isAddressExists.recipientPhoneNumber = recipientPhoneNumber
        await isAddressExists.save()

        res.status(200).json({ msg: 'Shipping address has been updated successfully', data: isAddressExists })
      } else {
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
      }
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
  }
}

export default shippingAddressCtrl