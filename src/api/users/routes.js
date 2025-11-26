const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('../../middlewares/auth');

router.get('/', auth, controller.getUsersController);

module.exports = router;
