const express = require('express');

const router = express.Router();
const departmentsController = require('../controllers/departmentController');

router.get('/', departmentsController.getAllDeparments)

module.exports = router;