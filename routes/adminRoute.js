const express = require('express')
const { addNewFlights, addNewFlightSchedule, deleteAFlight, deleteAFlightSchedule } = require('../controllers/adminController')
const { login } = require('../controllers/authController')
const { verifyUser, verifyAmin } = require('../middleware/verify')
const router = express.Router()

router.post('/login', login)

router.post('/flight', verifyUser, verifyAmin, addNewFlights)

router.delete('/flight', verifyUser, verifyAmin, deleteAFlight)

router.post('/flight-schedule', verifyUser, verifyAmin, addNewFlightSchedule)

router.delete('/flight-schedule', verifyUser, verifyAmin, deleteAFlightSchedule)

module.exports = router