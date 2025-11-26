// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/', auth, controller.getAllLeadsController);
router.get('/exports', controller.exportLeadsController);
router.get('/priority-leads', auth, controller.getPriorityLeads);
router.get('/:id', auth, controller.getLeadDetailController);

module.exports = router;
