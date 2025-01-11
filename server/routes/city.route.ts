import cityCtrl from './../controllers/cityCtrl'
import express from 'express'

const router = express.Router()

router.route('/').post(cityCtrl.create)
router.route('/id/:id').get(cityCtrl.readById)
router.route('/:provinceId').get(cityCtrl.read)

export default router