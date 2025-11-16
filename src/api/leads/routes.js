const express = require('express');
const router = express.Router();

// const authentications = require('../../middlewares/authentications');
const controller = require('./controller');

router.post('/', controller.postLeadController);
router.get('/', controller.getAllLeadsController);
router.get('/:id', controller.getLeadDetailController);

module.exports = router;
