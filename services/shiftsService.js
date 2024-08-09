const Shift = require('../models/shiftModel');

const getAllShifts = async () => {
    try {
        const shifts = Shift.find({})
        return shifts
    } catch (err) {
        console.error(err)
        throw new Error('Error fetching all shifts')
    }
}

module.exports = {
    getAllShifts,
}