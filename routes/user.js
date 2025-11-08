const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getProfile,
  updateProfile,
  getDashboard,
} = require('../controllers/user');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.route('/profile')
  .get(protect, getProfile)
  .put(
    protect,
    [
      check('name', 'Name is required').not().isEmpty().optional(),
      check('email', 'Please include a valid email').isEmail().optional(),
      check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).optional(),
      validate,
    ],
    updateProfile
  );

router.get('/dashboard', protect, getDashboard);

module.exports = router;