const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get current logged in user profile
// @route     GET /api/user/profile
// @access    Private
exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc      Update current logged in user profile
// @route     PUT /api/user/profile
// @access    Private
exports.updateProfile = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc      Get user dashboard data
// @route     GET /api/user/dashboard
// @access    Private
exports.getDashboard = async (req, res, next) => {
  // In a real application, this would fetch data specific to the user's dashboard
  // For now, we'll return a simple message and the user's basic info
  const user = await User.findById(req.user.id).select('-password'); // Exclude password

  res.status(200).json({
    success: true,
    data: {
      message: `Welcome to your dashboard, ${user.name}!`,
      user: user,
      // Add more dashboard-specific data here
    },
  });
};