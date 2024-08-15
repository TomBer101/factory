const mongoose = require('mongoose')

const Employee = require('../models/employeeModel');
const Shift = require('../models/shiftModel');

const getAllEmployees = async (departmentId) => {
    try {
        const matchStage = departmentId ? { departmentId: new mongoose.Types.ObjectId(departmentId) } : {};

        const employees = await Employee.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'departmentId',
                    foreignField: '_id',
                    as: 'department'
                }
            },
            { $unwind: '$department' },              
            {
                $lookup: {
                    from: 'shifts',
                    localField: '_id',
                    foreignField: 'employee',
                    as: 'shifts'
                }
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    startWorkYear: 1,
                    department: {
                        _id:1,
                        name: 1
                    },
                    shifts: {
                        _id: 1,
                        date: 1,
                        startingHour: 1,
                        endingHour: 1
                    }
                }
            }
        ]);

        return employees
    } catch (err) {
        console.error('Error fetching all employees: ', err);
        throw new Error('Error fetching all employees.')
    }
}

const addEmployee = async (employeeInfo) => {
    try {
        const newEmployee = new Employee({
            departmentId: employeeInfo.departmentId,
            firstName: employeeInfo.firstName,
            lastName: employeeInfo.lastName,
            startWorkYear: new Date().getFullYear()
        })

        const savedEmployee = await newEmployee.save();
        return savedEmployee;
    } catch (err) {
        console.error('Error adding new employee: ', err);
        throw new Error('There was an error saving new employee')
    }
}

const updateEmployee = async (employeeId, updatedData) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate({_id: employeeId}, updatedData, {new: true});
        return updatedEmployee
    } catch (err) {
        console.error('Error updateing employee: ', err)
        throw new Error('Coulnt update the chosen employee...');
    }
}


const deleteEmployee = async (employeeId) => {
    try {
        // Remove the employee from all shifts
        await Shift.updateMany(
            { employees: employeeId },
            { $pull: { employees: employeeId } }
        );

        // Delete the employee document
        const deletedEmployee = await Employee.deleteOne({ _id: employeeId });

        if (deletedEmployee.deletedCount === 0) {
            throw new Error(`Employee with ID ${employeeId} not found.`);
        }

        console.log(`Employee with ID ${employeeId} and their associated shifts have been updated.`);
    } catch (err) {
        console.error('Error deleting employee and updating shifts: ', err);
        throw new Error(`Failed to delete employee: ${employeeId}.`);
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
}