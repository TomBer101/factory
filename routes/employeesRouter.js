const express = require('express')

const router = express.Router();
const employeesController = require('../controllers/employeesController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');

router.get('/', authMiddleware, allowActionsMiddleware, employeesController.getAllEmployees);

module.exports = router;