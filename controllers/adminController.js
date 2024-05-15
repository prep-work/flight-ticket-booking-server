const { response } = require('express')
const flights = require('../models/flightsModel')
const flightSchedule = require('../models/flightScheduleModel')

const addNewFlights = async (request, response) => {
    console.log(request.body)
    const { flightCode, airlineCompany } = request.body

    try{
        const existingFlight = await flights.findOne({ flightCode })
        console.log(existingFlight)
        if(existingFlight) {
            return response.status(409).send({ message: "Flight Code is already exists."})
        }

        const newFlight = new flights({
            flightCode,
            airlineCompany
        })

        await newFlight.save()
        response.status(201).send({ message: "Flight Added Successfully"})

    }
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const deleteAFlight = async (request, response) => {
    const {_id} = request.body
    try {
        const existingFlight = await flights.findOne({ _id })
        if(!existingFlight) {
            return response.status(404).send({ message: 'Flight not found'})
        }

        await flights.deleteOne({ _id })
        response.status(200).send({ message: 'Flight deleted successfully'})

    }
    catch(error) {
        response.status(500).json({ message: error.message,})
    }
}

const addNewFlightSchedule = async (request, response) => {
    const { 
        flight,
        departureAirport,
        arrivalAirport,
        departureTime,
        arrivalTime,
        travelTimePeriod,
        totalNumberOfSeats,
        stops,
        totalEconomyClassSeats,
        economySeatClassPrice,
        totalPremiumEconomyClassSeats,
        premiumEconomySeatClassPrice,
        totalBusinessClassSeats,
        businessClassSeatPrice
    } = request.body
    const { stopLocations, stopTimePeriod } = request.body || null
    console.log(stopLocations)

    try{
        const newFlightSchedule = new flightSchedule({
            flight,
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
            travelTimePeriod,
            totalNumberOfSeats,
            stops,
            stopLocations: [...stopLocations],
            stopTimePeriod,
            totalEconomyClassSeats,
            economySeatClassPrice,
            totalPremiumEconomyClassSeats,
            premiumEconomySeatClassPrice,
            totalBusinessClassSeats,
            businessClassSeatPrice
        })
        console.log(newFlightSchedule)
        await newFlightSchedule.save()
        response.status(201).send({ message: "New Flight Schedule was added."})
    }
    catch(error) {
        response.status(500).send({ message: error.message })
    }
    
}

const deleteAFlightSchedule = async (request, response) => {
    const {_id} = request.body
    try {
        const existingFlight = await flightSchedule.findOne({ _id })
        if(!existingFlight) {
            return response.status(404).send({ message: 'Flight Schedule not found'})
        }

        await flightSchedule.deleteOne({ _id })
        response.status(200).send({ message: 'Flight Schedule deleted successfully'})

    }
    catch(error) {
        response.status(500).json({ message: error.message,})
    }
}

module.exports = {
    addNewFlights,
    deleteAFlight,
    addNewFlightSchedule,
    deleteAFlightSchedule
}