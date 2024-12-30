import Checkout from '../models/Checkout'
import { IReqUser } from './../utils/interface'
import { Response } from 'express'
import dotenv from 'dotenv'
import Cart from '../models/Cart'

dotenv.config({
  path: 'config/.env'
})

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const checkoutCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { products, country, province, city, district, postalCode, recipientName, recipientEmail, recipientPhoneNumber, address } = req.body

      const newCheckout = new Checkout({
        userId: req.user?._id,
        products,
        country,
        province,
        city,
        district,
        postalCode,
        recipientName,
        recipientEmail,
        recipientPhoneNumber,
        address
      })
      await newCheckout.save()

      const lineItems = products.map((product: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: ['https://placehold.co/600x400']
          },
          unit_amount: Math.round(product.price * 100)
        },
        quantity: product.qty
      }))

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/payment_success',
        cancel_url: 'http://localhost:5173/payment_cancel'
      })

      newCheckout.stripeSessionId = session.id
      await newCheckout.save()

      res.status(200).json({ msg: 'Order placed', id: session.id })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  updateStatus: async(req: IReqUser, res: Response) => {
    try {
      const lastCheckout = await Checkout.findOne({ userId: req.user?._id }).sort({ createdAt: -1 })
      
      const stripeSessionId = lastCheckout?.stripeSessionId
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId)

      if (session.payment_status === 'paid' && lastCheckout) {
        lastCheckout.status = 'Payment Success'
        await lastCheckout?.save()
      }

      if (lastCheckout) {
        for (let i = 0; i < lastCheckout.products.length; i++) {
          await Cart.findOneAndDelete({ id: lastCheckout.products[i].id })
        }
      }

      res.status(200).json({ status: session.payment_status })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default checkoutCtrl