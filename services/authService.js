const jwt = require('jsonwebtoken')
const userCredentialsRepo = require('../repositories/userCredentialsRepo');
const User = require('../models/userModel')

const dateUtils = require('../utils/dateUtils');


const login = async (userName, email) => {
    const {data: userCredentials} = await userCredentialsRepo.getUserByUserName(userName)
    if (!userCredentials) {
        throw new Error(`User name: ${userName} does not exists`)
    }

    const isValid = email === userCredentials.email
    if (!isValid) { 
        throw new Error('Wrong email!')
    }

    const user = await User.findOne({
        externalId: userCredentials.id
    })

    if (dateUtils.has24HoursPassed(user.lastLogin, Date.now())) {
        user.lastLogin = Date.now();
        user.currentActionsAmount = 0;
        await user.save();
    }

    const token = jwt.sign({userId: userCredentials.id, fullName: userCredentials.name}, process.env.JWT_SECRET)
    return token;
}

module.exports = {
    login
}
