// routes/userRoutes.js - User routes for EduBridge

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const TeacherProfile = require('../models/TeacherProfile');
const jwt = require('jsonwebtoken');
const { protect, authorize } = require('../middleware/auth');
const LearningGoal = require('../models/LearningGoal');
const StudySession = require('../models/StudySession'); 

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private (Admin)
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort('createdAt');
    
    res.json({
      status: 'success',
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
});

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

// @route   GET /api/users/courses
// @desc    Get courses created by the logged-in teacher
// @access  Private (Teacher/Admin)
router.get('/courses', protect, authorize('teacher', 'admin'), async (req, res, next) => {
  try {
    // Find courses where the instructor matches the logged in user
    const courses = await Course.find({ instructor: req.user.id })
      .populate('enrolledStudents.student', 'name email')
      .populate('ratings.student', 'name');
    
    res.json({
      status: 'success',
      count: courses.length,
      courses
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/users/register/admin
// @desc    Register a new admin (admin only)
// @access  Private (Admin)
router.post('/register/admin', protect, authorize('admin'), async (req, res, next) => {
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

    // Create new admin user
    const user = await User.create({
      username,
      email,
      password,
      name,
      role: 'admin',
      isVerified: true // Admins are auto-verified
    });

    res.status(201).json({
      status: 'success',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role
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

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

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
        lastLogin: user.lastLogin,
        teacherProfile
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
    teacherProfile.reviewedBy = req.user.id;
    teacherProfile.reviewedAt = Date.now();
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
    teacherProfile.reviewedBy = req.user.id;
    teacherProfile.reviewedAt = Date.now();
    await teacherProfile.save();

    res.json({
      status: 'success',
      message: 'Teacher application rejected'
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/:id
// @desc    Update user (admin only)
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { name, email, username, isVerified, role } = req.body;
    
    // Find user by ID
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Prevent changing another admin's role
    if (user.role === 'admin' && req.user.id !== user._id.toString() && role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Cannot change role of another administrator'
      });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    
    // Only update role if provided and not trying to change an admin's role
    if (role && !(user.role === 'admin' && role !== 'admin')) {
      user.role = role;
    }
    
    // Update verification status if provided
    if (typeof isVerified === 'boolean') {
      user.isVerified = isVerified;
    }

    await user.save();

    res.json({
      status: 'success',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    // Handle duplicate key errors (username or email already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        status: 'error',
        message: `The ${field} is already taken. Please choose another.`
      });
    }
    next(error);
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Don't allow deleting other admins
    if (user.role === 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Cannot delete admin users'
      });
    }

    // Check if user has created courses
    const userCourses = await Course.find({ instructor: user._id });
    if (userCourses.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete user with associated courses. Please delete or reassign their courses first.'
      });
    }

    // If it's a teacher, delete their profile too
    if (user.role === 'teacher') {
      await TeacherProfile.findOneAndDelete({ user: user._id });
    }

    // Remove user from enrolled courses
    await Course.updateMany(
      { 'enrolledStudents.student': user._id },
      { $pull: { enrolledStudents: { student: user._id } } }
    );

    // Remove user ratings from courses
    await Course.updateMany(
      { 'ratings.student': user._id },
      { $pull: { ratings: { student: user._id } } }
    );

    // Now delete the user
    await user.deleteOne(); // or User.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('User deletion error:', error);
    next(error);
  }
});

// @route   PUT /api/users/:id/verify
// @desc    Manually verify a user
// @access  Private (Admin only)
router.put('/:id/verify', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    user.isVerified = true;
    await user.save();

    res.json({
      status: 'success',
      message: 'User verified successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/users/init-admin
// @desc    Create initial admin account (only works if no admins exist)
// @access  Public
router.post('/init-admin', async (req, res, next) => {
  try {
    // For just checking if admin exists (used by frontend)
    if (req.body.checkOnly === true) {
      // Check if admin accounts already exist
      const adminExists = await User.findOne({ role: 'admin' });
      
      if (adminExists) {
        return res.status(400).json({
          status: 'error',
          message: 'Admin account already exists'
        });
      }
      
      return res.status(200).json({
        status: 'success',
        message: 'No admin account exists yet'
      });
    }

    const { username, email, password, name } = req.body;

    // Check if admin accounts already exist
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Admin account already exists'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    // Create new admin user
    const user = await User.create({
      username,
      email,
      password,
      name,
      role: 'admin',
      isVerified: true // Admins are auto-verified
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
        role: user.role
      }
    });
  } catch (error) {
    console.error('init-admin error:', error); // Add this for debugging
    next(error);
  }
});


// Learning Goals Routes
router.get('/learning-goals', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    
    // Find goals for this user
    const goals = await LearningGoal.find({ user: req.user.id });
    
    res.json({
      status: 'success',
      goals
    });
  } catch (error) {
    next(error);
  }
});

router.post('/learning-goals', protect, async (req, res, next) => {
  try {
    const { text, completed } = req.body;
    
    const goal = await LearningGoal.create({
      user: req.user.id,
      text,
      completed: completed || false
    });
    
    res.status(201).json({
      status: 'success',
      goal
    });
  } catch (error) {
    next(error);
  }
});

router.put('/learning-goals/:id', protect, async (req, res, next) => {
  try {
    const goal = await LearningGoal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }
    
    // Ensure user owns this goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this goal'
      });
    }
    
    // Update goal
    const updatedGoal = await LearningGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      status: 'success',
      goal: updatedGoal
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/learning-goals/:id', protect, async (req, res, next) => {
  try {
    const goal = await LearningGoal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }
    
    // Ensure user owns this goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this goal'
      });
    }
    
    await goal.deleteOne(); // Using deleteOne instead of remove() as remove() is deprecated
    
    res.json({
      status: 'success',
      message: 'Goal deleted'
    });
  } catch (error) {
    next(error);
  }
});

// Study Sessions Routes
router.get('/study-sessions', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    
    // Find sessions for this user
    const sessions = await StudySession.find({ user: req.user.id });
    
    res.json({
      status: 'success',
      sessions
    });
  } catch (error) {
    next(error);
  }
});

router.post('/study-sessions', protect, async (req, res, next) => {
  try {
    const { day, subject, time, completed } = req.body;
    
    const session = await StudySession.create({
      user: req.user.id,
      day,
      subject,
      time,
      completed: completed || false
    });
    
    res.status(201).json({
      status: 'success',
      session
    });
  } catch (error) {
    next(error);
  }
});

router.put('/study-sessions/:id', protect, async (req, res, next) => {
  try {
    const session = await StudySession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Study session not found'
      });
    }
    
    // Ensure user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this session'
      });
    }
    
    // Update session
    const updatedSession = await StudySession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      status: 'success',
      session: updatedSession
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/study-sessions/:id', protect, async (req, res, next) => {
  try {
    const session = await StudySession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Study session not found'
      });
    }
    
    // Ensure user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this session'
      });
    }
    
    await session.deleteOne(); // Using deleteOne instead of remove() as remove() is deprecated
    
    res.json({
      status: 'success',
      message: 'Study session deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;