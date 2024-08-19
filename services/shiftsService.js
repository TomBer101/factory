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

module.exports = {
    getAllShifts,
    updateShift
}