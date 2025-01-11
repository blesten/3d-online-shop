import provinceCtrl from './../controllers/provinceCtrl'
import express from 'express'

const router = express.Router()

router.route('/')
  .get(provinceCtrl.read)
  .post(provinceCtrl.create)

router.route('/:id').get(provinceCtrl.readById)

export default router