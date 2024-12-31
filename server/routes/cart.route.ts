import { isAuthenticated } from './../middlewares/auth'
import cartCtrl from './../controllers/cartCtrl'
import express from 'express'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, cartCtrl.read)
  .post(isAuthenticated, cartCtrl.create)

router.route('/all')
  .patch(isAuthenticated, cartCtrl.updateAllStatus)

router.route('/:id')
  .patch(isAuthenticated, cartCtrl.update)
  .delete(isAuthenticated, cartCtrl.delete)

export default router