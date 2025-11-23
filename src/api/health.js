const express = require('express');
const router = express.Router();

const health = router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server sedang berjalan',
    timestamp: new Date().toISOString(),
  });
});

module.exports = health;
