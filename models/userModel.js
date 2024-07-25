const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    externalId : Number,
    fullName: {
        type: String,
        require: true
    },
    numOfActions: {
        type: Number,
        require: true,
    },
    currentActionsAmount: Number,
    lastLogin: Date
})

module.exports = mongoose.model('user', userSchema)