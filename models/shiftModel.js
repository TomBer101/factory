const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    startingHour: {
        type: Number,
        require: true
    },
    endingHour: {
        type: Number,
        require: true
    },
    employees: 
        [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
    
})

module.exports = mongoose.model('shift', shiftSchema);