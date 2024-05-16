const booking = require('../models/bookingModel')
const flights = require('../models/flightScheduleModel')
const user = require('../models/userModel')
const {ObjectId} = require('mongodb')

const signup = async (request, response) => {
    const {firstName, lastName, email, password} = request.body

    try{
        const existingUser = await user.findOne({email})
        if(existingUser) {
            response.status(409).send({ message: 'Email id already exist'})
        }
        const userToBeRegistered = new user({firstName, lastName, email, password})

        await userToBeRegistered.save()
        response.status(201).send({ message: 'User created successfully'})
    } 
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const searchFlight = async (request, response) => {
    const { departureAirport, arrivalAirport, departureDate, arrivalDate } = request.body
    const departureAirportId = new ObjectId(departureAirport)
const arrivalAirportId = new ObjectId(arrivalAirport)

console.log(departureDate)
    try{
        const availableDepartureFlights = await flights.aggregate([
            {
                $match: {
                    departureAirport: departureAirportId,
                    arrivalAirport: arrivalAirportId,
                    departureTime: { $gt: new Date(departureDate) },
                },
            }
          ])

        if(!availableDepartureFlights) {
            return response.status(404).send({ message: "No flights found matching the criteria."})
        }

        response.status(200).send({ data: availableDepartureFlights, message: "Flight that matches the criteria."})

    }
    catch(error){
        response.status(500).send({ message: error.message})
    }
}

const bookATicket = async (request, response) => {
    console.log(request.user)
    const { journeyType,
    departingFlight,
    seatClass,
    seatPrice,
    numberOfAdults,
    numberOfChild,
    numberOfInfants,
    totalBookingCost } = request.body
    const { _id } = request.user

    try {
        const newBooking = new booking({
            user: _id,
            journeyType,
            departingFlight,
            seatClass,
            seatPrice,
            numberOfAdults,
            numberOfChild,
            numberOfInfants,
            totalBookingCost
        })

        await newBooking.save()

        response.status(201).send({ message: "Booking done successfully."})
    }
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const getBookingHistory = async (request, response) => {
    try{

        const bookingHistory = await booking.find()

        response.status(200).send({ data: bookingHistory, message: "Retrieved All Booking History"})
    }
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

module.exports = {
    signup,
    searchFlight,
    bookATicket,
    getBookingHistory
}