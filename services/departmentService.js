const Department = require('../models/departmentModal');
const Employee = require('../models/employeeModel');
const Shift = require('../models/shiftModel')
const mongoose = require('mongoose');

const getAllDepartment = async (fields) => {
    try {
        let projection = {};
        if (fields) {
            const fieldsArray = fields.split(',');
            fieldsArray.forEach(field => {
                projection[field] = 1;
            })
        } else {
            projection = {name: 1, manager: 1, _id: 1, employees: 1}
        }

        const departments = await Department.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'manager',
                    foreignField: '_id',
                    as: 'manager'
                }
            },
            { $unwind: '$manager'}
           , { $project: projection},
        ]);

        if (Object.keys(projection).includes('employees')) {
            const employeesByDepartment = await Employee.aggregate([
                {
                    $group: {
                        _id: '$departmentId',
                        employees: {$push: { firstName: '$firstName', lastName: '$lastName', id: '$_id'}}
                    }
                }
            ])
    
            const departmentsWithEmployees = departments.map(department => {
                const departmentEmployees = employeesByDepartment.find(group => group._id.equals(department._id));
                return {
                  name: department.name,
                  managerName: department.manager ? `${department.manager.firstName} ${department.manager.lastName}` : null,
                  managerId: department.manager? `${department.manager._id}` : null,
                  employees: departmentEmployees ? departmentEmployees.employees : []
                };
            });
          
            return departmentsWithEmployees;
        }

        return departments
    } catch (err) {
        console.error('Error fetching all departments: ', err)
        throw new Error('Error fetcching all departments.')
    }
}

const addDepartment = async (departmentInfo) => {
    try {
        const newDepartment = new Department({
            name: departmentInfo.name,
            manager: departmentInfo.manager
        })

        const savedDepartment = await newDepartment.save();
        return savedDepartment;
    } catch (err) {
        console.error('Error adding new department: ', err)
        throw new Error('There was an error saving new department.')
    }
}

const updateDepartment = async (departmentId, updatedData) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, updatedData, {new: true});
        return updatedDepartment
    } catch (err) {
        console.error('Error updateing department: ', err)
        throw new Error('Coulnt update the chosen department...');
    }
}

const deleteDepartment = async (departmentId) => {
    try {
        const employees = await Employee.find({ departmentId: departmentId });
        const employeeIds = employees.map(emp => emp._id);

        for (const employeeId of employeeIds) {
            await Shift.updateMany(
                { employees: employeeId },
                { $pull: { employees: employeeId } }
            );
        }

        await Employee.deleteMany({ departmentId: departmentId });

        const deletedDepartment = await Department.deleteOne({ _id: departmentId });

        if (deletedDepartment.deletedCount === 0) {
            throw new Error(`Department with ID ${departmentId} not found.`);
        }

        console.log(`Department with ID ${departmentId} and its associated employees have been deleted.`);
    } catch (err) {
        console.error('Error deleting department and updating employees and shifts: ', err);
        throw new Error(`Failed to delete department: ${departmentId}.`);
    }
};


module.exports = {
    getAllDepartment,
    addDepartment,
    updateDepartment,
    deleteDepartment
}