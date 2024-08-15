const departmentsService  = require('../services/departmentService');


const getAllDeparments = async (req, res) => {
    try {
        const { fields } = req.query;
        const departmens = await departmentsService.getAllDepartment(fields);
        res.status(200).json({departmens})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const addDepartment = async (req, res) => {
    try {
        const newDepartmentInfo = req.body.newDepartmentInfo;
        const newDepartment = departmentsService.addDepartment(newDepartmentInfo);
        res.status(200).json(newDepartment);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params
        const { updatedData } = req.body

        const updatedDepartment = await departmentsService.updateDepartment(departmentId, updatedData)
        res.status(200).json({updatedDepartment})
    } catch (err) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params

        const deleted = await departmentsService.deleteDepartment(departmentId)
        res.status(200).json({deleted})
    } catch (err) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {
    getAllDeparments,
    addDepartment,
    updateDepartment,
    deleteDepartment
}