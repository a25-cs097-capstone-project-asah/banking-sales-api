// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const controller = require('./controller');

router.post('/', auth, controller.postLeadController);
router.get('/', auth, controller.getAllLeadsController);
router.get('/exports', controller.exportLeadsController);
router.get('/:id', auth, controller.getLeadDetailController);

module.exports = router;
