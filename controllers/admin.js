const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get admin dashboard data
// @route     GET /api/admin/dashboard
// @access    Private/Admin
exports.getAdminDashboard = async (req, res, next) => {
  // In a real application, this would fetch data specific to the admin dashboard
  // For now, we'll return a simple message and some aggregated user stats
  const userCount = await User.countDocuments();
  const adminCount = await User.countDocuments({ role: 'admin' });
  const regularUserCount = userCount - adminCount;

  res.status(200).json({
    success: true,
    data: {
      message: 'Welcome to the Admin Dashboard!',
      totalUsers: userCount,
      adminUsers: adminCount,
      regularUsers: regularUserCount,
      // Add more admin-specific data here
    },
  });
};