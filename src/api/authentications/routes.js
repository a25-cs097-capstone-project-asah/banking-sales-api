const express = require('express');
const router = express.Router();

const controller = require('./controller');
const { authLimit } = require('../../middlewares/rateLimiter');

router.post('/', authLimit, controller.postAuthenticationsController);
router.put('/', controller.putAuthenticationsController);
router.delete('/', controller.deleteAuthenticationsController);

module.exports = router;
