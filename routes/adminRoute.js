const express = require('express')
const { addNewFlights, addNewFlightSchedule } = require('../controllers/adminController')
const router = express.Router()

router.post('/flight', addNewFlights)

router.post('/flight-schedule', addNewFlightSchedule)

module.exports = router