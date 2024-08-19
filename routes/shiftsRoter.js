const express = require('express')
const router = express.Router();
const shiftsController = require('../controllers/shiftsController');

const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware');

router.use(authMiddleware, allowActionsMiddleware, loggerMiddlware)

router.get('/', shiftsController.getAllShifts)
router.patch('/:shiftId', shiftsController.updateShift)
router.post('/', shiftsController.updateShift)

module.exports = router;