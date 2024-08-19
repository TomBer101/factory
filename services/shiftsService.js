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

const updateShift = async (shiftId, updatedData) => {
    try {
        const {employees, ...restOfShift} = updatedData

        const shiftToUpdate = await Shift.findByIdAndUpdate(shiftId, restOfShift, {new: true})
        
        if (employees) {
            shiftToUpdate.employees = [...shiftToUpdate.employees, ...employees]
        }
        
        await shiftToUpdate.save()
        return shiftToUpdate
    } catch (err) {
        console.error('Error updateing shift: ', err);
        throw new Error('Couldnt update chosen shift');
    }
}

const addshift = async (shiftData) => {
    try {
        const newShift = new Shift({
            startingHour: shiftData.startingHour,
            endingHour: shiftData.endingHour,
            date: shiftData.date
        })

        const savedShift = await newShift.save();
        return savedShift
    } catch (err) {
        console.error(('Error addung new shift: ', err));
        throw new Error('There was an error saving new shift...')
    }
};

module.exports = {
    getAllShifts,
    updateShift,
    addshift
}