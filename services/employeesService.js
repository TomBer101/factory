const Employee = require('../models/employeeModel');

const getAllEmployees = async () => {
    try {
        const employees = await Employee.aggregate([
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
                    firstname: 1,
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

const addEmployee = async ({firstName, lastName, departmentId}) => {
    try {
        const newEmployee = new Employee({
            departmentId: departmentId,
            firstName: firstName,
            lastName: lastName,
            startWorkYear: new Date().getFullYear
        })

        const savedEmployee = await newEmployee.save();
        return savedEmployee;
    } catch (err) {
        console.error('Error adding new employee: ', err);
        throw new Error('There was an error saving new employee')
    }
}

module.exports = {
    getAllEmployees,
    addEmployee
}