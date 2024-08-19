const shiftsService = require('../services/shiftsService')

const getAllShifts = async (req, res) => {
    try {
            const shifts = await shiftsService.getAllShifts();
    res.status(200).json({shifts})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

};

const updateShift = async (req, res) => {
    try {
        const {shiftId} = req.params
        const {updatedData} = req.body

        const updatedShift = await shiftsService.updateShift(shiftId, updatedData)
        res.status(200).json({updatedShift})
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {
    getAllShifts,
    updateShift
}