const  mongoose = require('mongoose')
const {DB_URI} = require('../config/config')

const connectToDatabase = async () => {
    const db = await mongoose.connect(DB_URI)
    console.log(`Connected successfully to database : ${db.connection.host}`)
}

module.exports = connectToDatabase