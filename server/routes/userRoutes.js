// routes/userRoutes.js - User routes for EduBridge

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile'); // Create this model
const jwt = require('jsonwebtoken');
const { protect, authorize } = require('../middleware/auth');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/users/register
// @desc    Register a new user (student)
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, name, role } = req.body;

    // Only allow student role from this endpoint (or default to student)
    const userRole = role === 'student' ? 'student' : 'student';

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
      name,
      role: userRole
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

// @route   POST /api/users/register/teacher
// @desc    Register a new teacher
// @access  Public
router.post('/register/teacher', async (req, res, next) => {
  try {
    const { 
      username, email, password, name, 
      teacherProfile: { title, institution, expertise, biography } 
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    // Create new user with teacher role
    const user = await User.create({
      username,
      email,
      password,
      name,
      role: 'teacher',
      isVerified: false // Teachers need verification
    });

    // Create teacher profile
    await TeacherProfile.create({
      user: user._id,
      title,
      institution,
      expertise,
      biography,
      status: 'pending' // Pending approval
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
        isVerified: user.isVerified,
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
        isVerified: user.isVerified,
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

    // If user is a teacher, get the teacher profile too
    let teacherProfile = null;
    if (user.role === 'teacher') {
      teacherProfile = await TeacherProfile.findOne({ user: user._id });
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
        isVerified: user.isVerified,
        preferences: user.preferences,
        enrolledCourses: user.enrolledCourses,
        createdAt: user.createdAt,
        teacherProfile
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update profile routes here...

// @route   GET /api/users/teachers/pending
// @desc    Get all pending teacher applications
// @access  Private (Admin only)
router.get('/teachers/pending', protect, authorize('admin'), async (req, res, next) => {
  try {
    const pendingTeachers = await TeacherProfile.find({ status: 'pending' })
      .populate('user', 'name email username');

    res.json({
      status: 'success',
      count: pendingTeachers.length,
      data: pendingTeachers
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/teachers/:id/approve
// @desc    Approve a teacher application
// @access  Private (Admin only)
router.put('/teachers/:id/approve', protect, authorize('admin'), async (req, res, next) => {
  try {
    const teacherProfile = await TeacherProfile.findById(req.params.id);

    if (!teacherProfile) {
      return res.status(404).json({
        status: 'error',
        message: 'Teacher application not found'
      });
    }

    // Update teacher profile status
    teacherProfile.status = 'approved';
    await teacherProfile.save();

    // Update user verification status
    await User.findByIdAndUpdate(teacherProfile.user, {
      isVerified: true
    });

    res.json({
      status: 'success',
      message: 'Teacher application approved'
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/teachers/:id/reject
// @desc    Reject a teacher application
// @access  Private (Admin only)
router.put('/teachers/:id/reject', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { reason } = req.body;
    const teacherProfile = await TeacherProfile.findById(req.params.id);

    if (!teacherProfile) {
      return res.status(404).json({
        status: 'error',
        message: 'Teacher application not found'
      });
    }

    // Update teacher profile status
    teacherProfile.status = 'rejected';
    teacherProfile.rejectionReason = reason || 'Application did not meet our requirements';
    await teacherProfile.save();

    res.json({
      status: 'success',
      message: 'Teacher application rejected'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;