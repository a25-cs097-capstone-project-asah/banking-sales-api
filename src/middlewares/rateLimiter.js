const { rateLimit } = require('express-rate-limit');

const authLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 menit
  max: 10, // Batas 10 request login gagal
  message: {
    status: 'fail',
    message:
      'Terlalu banyak percobaan login, silakan coba lagi setelah 5 menit.',
  },
  standardHeaders: 'draft-6',
  legacyHeaders: false,
});

module.exports = {
  authLimit,
};
