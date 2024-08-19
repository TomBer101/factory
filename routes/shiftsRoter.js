const express = require('express')
const router = express.Router();
const shiftsController = require('../controllers/shiftsController');

const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware');

router.get('/', authMiddleware, allowActionsMiddleware, loggerMiddlware, shiftsController.getAllShifts)
router.patch('/:shiftId', authMiddleware, allowActionsMiddleware, loggerMiddlware, shiftsController.updateShift)

module.exports = router;