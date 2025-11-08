const express = require('express');
const { getAdminDashboard } = require('../controllers/admin');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);

module.exports = router;