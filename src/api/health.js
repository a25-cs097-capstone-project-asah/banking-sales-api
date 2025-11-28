const express = require('express');
const router = express.Router();

const health = router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server sedang berjalan',
    timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
  });
});

module.exports = health;
