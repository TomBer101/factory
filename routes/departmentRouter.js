const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware')

router.use(authMiddleware, allowActionsMiddleware, loggerMiddlware)

router.get('/', departmentsController.getAllDeparments)
router.post('/', departmentsController.addDepartment)
router.patch('/:departmentId', departmentsController.updateDepartment)
router.delete('/:departmentId', departmentsController.deleteDepartment)


module.exports = router;