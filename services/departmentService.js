const Department = require('../models/departmentModal');
const Employee = require('../models/employeeModel');

const getAllDepartment = async () => {
    try {
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
        ]);

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

    } catch (err) {
        console.error('Error fetching all departments: ', err)
        throw new Error('Error fetcching all departments.')
    }
}

module.exports = {
    getAllDepartment,
}