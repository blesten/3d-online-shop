import express from 'express'
import { isAuthenticated } from '../middlewares/auth'
import shippingAddressCtrl from '../controllers/shippingAddressCtrl'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, shippingAddressCtrl.read)
  .post(isAuthenticated, shippingAddressCtrl.create)

router.route('/:id').patch(isAuthenticated, shippingAddressCtrl.update)

export default router