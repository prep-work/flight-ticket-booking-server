const userModel = require('../models/userModel')
const initialData = require('../database/initialData')

const bcrypt = require('bcrypt')

const login = async (request, response) => {
    const allUserData = await userModel.find()
    if(allUserData.length == 0) {
        const initialUser = new userModel(initialData)
        await initialUser.save()
    }    

    const {email} = request.body 
    try{
        const existingUser = await userModel.findOne({ email }).select('+password') 
        if(!existingUser) {
            return response.status(401).send({ message: 'Invalid email address'})
        }

        const validatePassword = await bcrypt.compare(`${request.body.password}`, existingUser.password)
        if(!validatePassword) {
            return response.status(401).send({ message: 'Invalid password'})
        }

        let options = {
            // maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        const {password, ...userData} = existingUser?._doc
        const token = existingUser.generateAccessJWT()     
        response.cookie('SessionID', token, options)
        response.status(200).send({ data: [token, userData], message: 'Login Successfully'})
    } 
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

module.exports = {
    login,
}