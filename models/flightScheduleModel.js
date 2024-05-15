const mongoose = require('mongoose')

const flightScheduleSchema =  new mongoose.Schema(
    {
        flight: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "flights"
        },
        departureAirPort: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "airports"
        },
        arrivalAirport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "airports"
        },
        departureTime: {
            type: Date,
            required: [true, "Departure time is a mandatory field"],
        },
        arrivalTime: {
            type: Date, 
            required: [true, "Arrival time is a mandatory field"], 
        },
        travelTimePeriod: {
            type: Number,
            required: [true, "Travel time period is a mandatory field"]
        },
        totalNumberOfSeats: {
            type: Number,
            required: [true, "Total number of seats is a mandatory field"],
        },
        stops: {
            type: String, 
            enum: ["no-stop", "1-stop", "2-stops"],
            required: [true, "Stops is a mandatory field"]
        },
        stopLocations: {
            type: [mongoose.Schema.Types.ObjectId],
            default: [],
            required: function() {
                return this.stops !== "no-stop"
            }

        },
        stopTimePeriod: {
            type: [Number],
            required: function() {
                return this.stops !== "no-stop"
            }
        },
        totalEconomyClassSeats: {
            type: Number,
            required: [true, "Total economy class seats is a mandatory field"],
        },
        economySeatClassPrice: {
            type: Number,
            required: [true, "Economy class seat price is a mandatory field"]
        },
        totalPremiumEconomyClassSeats: {
            type: Number,
            required: [true, "Total premium economy class seats is a mandatory field"],
        },
        premiumEconomySeatClassPrice: {
            type: Number,
            required: [true, "Premium economy seat price is a mandatory field"]
        },
        totalBusinessClassSeats: {
            type: Number,
            required: [true, "Total business class seats is a mandatory field"],
        },
        businessClassSeatPrice: {
            type: Number,
            required: [true, "Business class seat price is a mandatory field"]
        },

    },
    {
        timestamps: true,
    },
    {
        collection: 'flightSchedule'
    }
)

module.exports = mongoose.model.flightSchedule || mongoose.model('flightSchedule', flightScheduleSchema)