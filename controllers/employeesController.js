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

const updateEmployee = async (req, res) => {
    try {
        const {employeeId} = req.params;
        const {updatedData} = req.body;

        const updatedEmployee = await  employeesService.updateEmployee(employeeId, updatedData)
        res.status(200).json({updatedEmployee})
    } catch (err) {
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
}