import { isAuthenticated } from './../middlewares/auth'
import savedCtrl from './../controllers/savedCtrl'
import express from 'express'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, savedCtrl.read)
  .post(isAuthenticated, savedCtrl.create)

router.route('/:id')
  .patch(isAuthenticated, savedCtrl.update)
  .delete(isAuthenticated, savedCtrl.delete)

export default router