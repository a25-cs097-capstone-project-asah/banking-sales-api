const express = require('express');
const router = express.Router();
const controller = require('./controller');

const authentications = require('../../middlewares/authentications');

router.get('/stats', authentications, controller.getStatsController);
router.get('/charts', authentications, controller.getChartController);
router.get('/priorities', authentications, controller.getPriorityLeads);

module.exports = router;
