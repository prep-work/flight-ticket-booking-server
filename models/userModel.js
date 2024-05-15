const mongoose = require('mongoose')
const { ACCESS_TOKEN } = require('../config/config')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: [true, "First name is a mandatory field"]
        },
        lastName: {
            type: String, 
            required: [true, "First name is a mandatory field"]

        },
        email: {
            type: String,
            required: [true, "Email is a mandatory filed"]
        },
        password: {
            type: String, 
            required: [true, "Password is a mandatory field"]
        },
        role: {
            type: String,
            enum: ["user", "admin"]
        }
    },
    {
        timestamps: true
    },
    {
        collection: "users"
    }
)

userSchema.pre('save', function(next) {
    const user = this

    if(!user.isModified('password')) return next()
    bcrypt.genSalt(10, (error, salt) => {
        if(error) return next(error)

        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error)

            user.password = hash
            next()
        })
    })
})

userSchema.methods.generateAccessJWT = function() {
    let payload = { id : this._id}
    return jwt.sign(payload, ACCESS_TOKEN, {expiresIn: '30d'})
}

module.exports = mongoose.model.users || mongoose.model("users", userSchema)