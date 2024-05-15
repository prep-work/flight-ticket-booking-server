const mongoose = require('mongoose')

const airportSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Airport name is a mandatory field"]
        },
        location: {
            type: String, 
            required: [true, "Airport location is a mandatory field"]
        },
        code: {
            type: String, 
            required: [true, "Airport code is a mandatory field"]
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'airports'
    }
)

module.exports = mongoose.model.airports || mongoose.model('airports', airportSchema)