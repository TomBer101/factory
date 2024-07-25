const jwt = require('jsonwebtoken')
const userCredentialsRepo = require('../repositories/userCredentialsRepo');
const User = require('../models/userModel')

const login = async (userName, email) => {
    const {data: userCredentials} = await userCredentialsRepo.getUserByUserName(userName)
    if (!userCredentials) {
        throw new Error(`User name: ${userName} does not exists`)
    }

    const isValid = email === userCredentials.email
    if (!isValid) { 
        throw new Error('Wrong email!')
    }

    const updatedUser = await User.findOneAndUpdate({
        externalId: userCredentials.id
    }, 
    {
        lastLogin: Date.now()
    })

    const token = jwt.sign({userId: userCredentials.id, fullName: userCredentials.name}, process.env.JWT_SECRET)
    return token;
}

module.exports = {
    login
}
