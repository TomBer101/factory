const User = require('../models/userModel')

const getUserByexternalId =  (userId) => {
    const user = User.findOne({externalId: userId});
    return user;
}

const updateUser = async (userId, updates) => {
    const updatedUser = User.updateOne({externalId: userId}, updates);
    return updatedUser;
}

module.exports = {
    getUserByexternalId,
    updateUser
}