const express = require('express')

const router = express.Router();
const employeesController = require('../controllers/employeesController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const actionMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware');


//TODO: i thing this entire rout needs to use these two middlwares
router.get('/', authMiddleware, allowActionsMiddleware, loggerMiddlware, employeesController.getAllEmployees);
router.post('/:employeeId', authMiddleware, allowActionsMiddleware, employeesController.updateEmployee)
router.post('/', authMiddleware,actionMiddleware, employeesController.addEmployee)

module.exports = router;