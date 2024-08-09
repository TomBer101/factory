const express = require('express');

const router = express.Router();
const departmentsController = require('../controllers/departmentController');

router.get('/', authMiddleware, allowActionsMiddleware, loggerMiddlware, departmentsController.getAllDeparments)
router.post('/', departmentsController.addDepartment)

module.exports = router;