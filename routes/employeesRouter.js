const express = require('express')

const router = express.Router();
const employeesController = require('../controllers/employeesController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const actionMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware');

router.use(authMiddleware, allowActionsMiddleware, loggerMiddlware)

//TODO: i thing this entire rout needs to use these two middlwares
router.get('/', employeesController.getAllEmployees); 
router.patch('/:employeeId', employeesController.updateEmployee)
router.post('/', employeesController.addEmployee)
router.delete('/:employeeId', employeesController.deleteEmployee)

module.exports = router;