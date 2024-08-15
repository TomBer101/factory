const User = require('../models/userModel');

const updateUser = async (userId, updates) => {
    try {
        const res = await User.updateOne({externalId: userId}, updates, {new: true});
        console.log(`Updated user ${userId}: `, res);
        return true
    } catch (err) {
        console.error(`Error updating user: ${userId}: `, err);
        return false
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find({}, {
            currentActionsAmount,
            fullName,
            numOfActions
        })

        return users
    } catch (err) {
        console.error('Error fetching all employees: ', err)
        throw new Error('Error fetching all users.')
    }
}

module.exports = {
    updateUser,
    getAllUsers,
}