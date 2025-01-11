import districtCtrl from './../controllers/districtCtrl'
import express from 'express'

const router = express.Router()

router.route('/').post(districtCtrl.create)
router.route('/id/:id').get(districtCtrl.readById)
router.route('/:cityId').get(districtCtrl.read)

export default router