// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/', auth, controller.getAllLeadsController);
router.get('/priority-leads', auth, controller.getPriorityLeadsController);
router.get('/exports', controller.exportLeadsController);
router.get('/:id', auth, controller.getLeadDetailController);
router.put('/:id', auth, controller.putLeadStatusByIdController);
router.post('/:id/email', auth, controller.postSendEmailToLeadController);

module.exports = router;
