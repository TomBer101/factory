const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware');
const allowActionsMiddleware = require('../middlewares/allowActionMiddleware');
const loggerMiddlware = require('../middlewares/logMiddleware');

router.use(authMiddleware,allowActionsMiddleware, loggerMiddlware)

router.get('/', usersController.getAllUsers)

module.exports = router