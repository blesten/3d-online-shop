import express from 'express'
import { isAuthenticated } from '../middlewares/auth'
import shippingAddressCtrl from '../controllers/shippingAddressCtrl'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, shippingAddressCtrl.read)
  .post(isAuthenticated, shippingAddressCtrl.create)

export default router