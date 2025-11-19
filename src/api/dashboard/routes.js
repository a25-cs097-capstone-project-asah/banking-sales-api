const express = require('express');
const router = express.Router();
const controller = require('./controller');

const auth = require('../../middlewares/auth');

router.get('/stats', auth, controller.getStatsController);
router.get('/charts', auth, controller.getChartController);
router.get('/priority-leads', auth, controller.getPriorityLeads);

module.exports = router;
