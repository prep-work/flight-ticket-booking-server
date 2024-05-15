const user = require('../models/userModel')

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

module.exports = {
    signup
}