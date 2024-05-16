const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        journeyType: {
            type: String,
            enum: ["one-way", "round-trip"],
            required: [true, "Journey Type is a mandatory field"]
        },
        departingFlight: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "flightSchedule",
        },
        seatClass: {
            type: String, 
            enum: ['economy', 'premiumEconomy', 'business'],
            required: [true, "Seat class is a mandatory field"],
        },
        seatPrice: {
            type: Number,
            required: [true, "Sear price is a mandatory field"],
        },
        numberOfAdults: {
            type: Number,
            required: [true, "No of adult seats is a mandatory field"],
        },
        numberOfChild: {
            type: Number,
            default: 0,
        },
        numberOfInfants: {
            type: Number,
            default: 0,
        },
        totalBookingCost: {
            type: Number,
            required: [true, "Total booking cost is a mandatory field"],
        }
    }
)

module.exports = mongoose.model.bookingSchema || mongoose.model('bookings', bookingSchema)