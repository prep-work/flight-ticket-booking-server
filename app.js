const express = require('express')
const app = express()

const {PORT} = require('./config/config')
const connect = require('./database/connection')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const adminRoute = require("./routes/adminRoute")

app.get('/', (request, response) => {
    response.status(200).send({message : "It's working ✌️"})
})

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/admin', adminRoute)

connect() 
    .then( () => {
        try{
            app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })
