const Department = require('../models/departmentModal');
const Employee = require('../models/employeeModel');

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

module.exports = {
    getAllDepartment,
}