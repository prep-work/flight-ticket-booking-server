const express = require('express')
const { addNewFlights, addNewFlightSchedule } = require('../controllers/adminController')
const { login } = require('../controllers/authController')
const { verifyUser, verifyAmin } = require('../middleware/verify')
const router = express.Router()

router.post('/login', login)

router.post('/flight', verifyUser, verifyAmin, addNewFlights)

router.post('/flight-schedule', verifyUser, verifyAmin, addNewFlightSchedule)

module.exports = router