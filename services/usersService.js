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

module.exports = {
    updateUser,
}