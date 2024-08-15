const express = require('express');

const router = express.Router();
const departmentsController = require('../controllers/departmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware')

router.get('/', authMiddleware, allowActionsMiddleware, loggerMiddlware, departmentsController.getAllDeparments)
router.post('/', authMiddleware, allowActionsMiddleware, loggerMiddlware, departmentsController.addDepartment)
router.patch('/:departmentId', authMiddleware, allowActionsMiddleware, loggerMiddlware, departmentsController.updateDepartment)
router.delete('/:departmentId', authMiddleware, allowActionsMiddleware, loggerMiddlware, departmentsController.deleteDepartment)


module.exports = router;