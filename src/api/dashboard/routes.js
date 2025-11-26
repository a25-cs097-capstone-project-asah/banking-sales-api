const express = require('express');
const router = express.Router();
const controller = require('./controller');

const auth = require('../../middlewares/auth');

router.get('/stats', auth, controller.getStatsController);
router.get('/charts', auth, controller.getChartController);

module.exports = router;
