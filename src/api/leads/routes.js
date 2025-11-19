// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const controller = require('./controller');

// Endpoint untuk membuat lead baru (POST)
// Middleware authentications memastikan user telah login/valid
router.post('/', auth, controller.postLeadController);

// Endpoint untuk mengambil semua data lead (GET)
router.get('/', auth, controller.getAllLeadsController);

// Endpoint untuk mengambil detail lead berdasarkan ID (GET /:id)
router.get('/:id', auth, controller.getLeadDetailController);

module.exports = router;
