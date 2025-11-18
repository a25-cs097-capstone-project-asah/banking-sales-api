const express = require('express');
const router = express.Router();

module.exports = router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server sedang berjalan',
    timestamp: new Date().toISOString(),
  });
});
