const departmentsService  = require('../services/departmentService');


const getAllDeparments = async (req, res) => {
    try {
        const departmens = await departmentsService.getAllDepartment();
        res.status(200).json({departmens})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllDeparments,
}