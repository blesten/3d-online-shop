import { Request, Response } from 'express'
import { IReqUser } from './../utils/interface'
import Cart from '../models/Cart'

const cartCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { id, qty, shippingDaysCount, price, isSelected } = req.body

      if (!id || !qty || !shippingDaysCount || !price) {
        res.status(400).json({ msg: 'Please provide required field to create cart' })
        return
      }

      const newCart = new Cart({
        userId: req.user?._id,
        id,
        qty,
        shippingDaysCount,
        price,
        isSelected
      })
      await newCart.save()

      res.status(200).json({ msg: 'T-Shirt has been added to cart successfully' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: IReqUser, res: Response) => {
    try {
      const cart = await Cart.find({ userId: req.user?._id })

      res.status(200).json({ data: cart })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params
      const { qty, isSelected } = req.body

      if (!qty) {
        res.status(400).json({ msg: 'Please provide required field to update cart' })
        return
      }

      const cartData = await Cart.findOne({ id })
      if (!cartData) {
        res.status(404).json({ msg: 'Cart not found' })
        return
      }

      cartData.qty = qty
      cartData.isSelected = isSelected
      await cartData.save()

      res.status(200).json({
        msg: 'Cart has been updated successfully',
        data: cartData
      })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      await Cart.findOneAndDelete({ id })

      res.status(200).json({ msg: 'T-Shirt has been removed from cart successfully' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  updateAllStatus: async(req: IReqUser, res: Response) => {
    try {
      const { isSelected } = req.body

      await Cart.updateMany({ userId: req.user?._id }, {
        isSelected
      })

      res.status(200).json({ msg: 'Update success' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default cartCtrl