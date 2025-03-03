// routes/userRoutes.js - User routes for EduBridge

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, authorize } = require('../middleware/auth');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      name
    });

    // Generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('enrolledCourses', 'title');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        role: user.role,
        preferences: user.preferences,
        enrolledCourses: user.enrolledCourses,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { name, profilePicture, preferences } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    if (preferences) {
      if (preferences.language) user.preferences.language = preferences.language;
      if (typeof preferences.notifications === 'boolean') user.preferences.notifications = preferences.notifications;
      if (preferences.theme) user.preferences.theme = preferences.theme;
    }

    await user.save();

    res.json({
      status: 'success',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        role: user.role,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;