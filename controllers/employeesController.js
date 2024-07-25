const employeesService = require('../services/employeesService');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeesService.getAllEmployees()
        res.status(200).json({employees})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const addEmployee = async (req, res) => {
    try {
        const newEmployeeInfo = req.body.employeeInfo
        const newEmployee = employeesService.addEmployee(newEmployeeInfo);
        res.status(200).json(newEmployee);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
}