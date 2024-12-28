import express from 'express'
import savedCtrl from '../controllers/savedCtrl'
import { isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, savedCtrl.read)
  .post(isAuthenticated, savedCtrl.create)

router.route('/:id')
  .patch(isAuthenticated, savedCtrl.update)
  .delete(isAuthenticated, savedCtrl.delete)

export default router