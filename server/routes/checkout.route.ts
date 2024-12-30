import express from 'express'
import { isAuthenticated } from '../middlewares/auth'
import checkoutCtrl from '../controllers/checkoutCtrl'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, checkoutCtrl.read)
  .post(isAuthenticated, checkoutCtrl.create)
  .patch(isAuthenticated, checkoutCtrl.updateStatus)

export default router