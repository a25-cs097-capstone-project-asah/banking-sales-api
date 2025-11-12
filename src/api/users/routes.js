const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/', controller.postUserController);
router.get('/', controller.getUsersController);
router.get('/:id', controller.getUserDetailController);

module.exports = router;
