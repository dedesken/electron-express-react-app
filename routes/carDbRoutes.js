const express = require('express')
const { getAllCars, getCarModels, addCar, addCarModel } = require('../controllers/carsController')

const router = express.Router()

router.get('/', getAllCars())
router.post('/', addCar())
router.get('/models/:id', getCarModels())
router.post('/models/:id', addCarModel())

module.exports = router