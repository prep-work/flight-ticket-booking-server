const flightsModel = require('../models/flightsModel')

const addNewFlights = async (request, response) => {
    console.log(request.body)
    const { flightCode, airlineCompany } = request.body

    try{
        const existingFlight = await flightsModel.findOne({ flightCode })
        console.log(existingFlight)
        if(existingFlight) {
            return response.status(409).send({ message: "Flight Code is already exists."})
        }

        const newFlight = new flightsModel({
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

module.exports = {
    addNewFlights
}