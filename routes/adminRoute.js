const express = require('express')
const { addNewFlights } = require('../controllers/adminController')
const router = express.Router()

router.post('/add-flight', addNewFlights)

module.exports = router