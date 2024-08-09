const Employee = require('../models/employeeModel');
const Shift = require('../models/shiftModel');

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
        const updatedEmployee = await Employee.findOneAndUpdate({_id: employeeId}, updatedData);
        return updatedEmployee
    } catch (err) {
        console.error('Error updateing employee: ', err)
        throw new Error('Coulnt update the chosen employee...');
    }
}

//TODO : change to work with employees array
const deleteEmployee = async (employeeId) => {
    try {
        const deletedEmployee = await Employee.deleteOne({_id: employeeId});
        const deletedShifte = await Shift.deleteMany({employee: employeeId});

    } catch (err) {
        console.error('Error deleting users data: ', err);
        throw new Error(`Failed deleteng user: ${employeeId}. `)
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
}