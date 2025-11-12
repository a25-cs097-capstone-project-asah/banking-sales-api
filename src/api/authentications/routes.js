const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/', controller.postAuthenticationsController);
router.put('/', controller.putAuthenticationsController);
router.delete('/', controller.deleteAuthenticationsController);

module.exports = router;
