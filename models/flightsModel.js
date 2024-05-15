const mongoose = require('mongoose')

const flightsSchema =  new mongoose.Schema(
    {
        flightCode: {
            type: String,
            required: [true, "Flight Code is a mandatory field"],
            unique: true
        },
        airlineCompany: {
            type: String, 
            required: [true, "Arline Company is a mandatory field"]
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'flights'
    }
)

module.exports = mongoose.model.flights || mongoose.model('flights', flightsSchema)