const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({

    name : {
        type: String,
        require: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('department', departmentSchema);