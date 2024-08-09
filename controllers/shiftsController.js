const shiftsService = require('../services/shiftsService')

const getAllShifts = async (req, res) => {
    try {
            const shifts = await shiftsService.getAllShifts();
    res.status(200).json({shifts})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

};

module.exports = {
    getAllShifts,
}