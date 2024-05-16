const express = require('express')
const router = express.Router()

const {login} = require('../controllers/authController')
const {verifyUser} = require('../middleware/verify')
const { signup, searchFlight, bookATicket, getBookingHistory } = require('../controllers/userController')

router.post('/signup', signup)

router.post('/login', login)

router.post('/flight/search', verifyUser, searchFlight)

router.post('/flight/book', verifyUser, bookATicket)

router.get('/flight/history', verifyUser, getBookingHistory)

module.exports = router