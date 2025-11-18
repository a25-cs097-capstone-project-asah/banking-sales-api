const express = require('express');
const router = express.Router();

const authentications = require('../../middlewares/authentications');
const controller = require('./controller');

router.post('/', authentications, controller.postLeadController);
router.get('/', authentications, controller.getAllLeadsController);
router.get('/:id', authentications, controller.getLeadDetailController);

module.exports = router;
