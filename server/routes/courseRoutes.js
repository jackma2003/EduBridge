// routes/courseRoutes.js - Course routes for EduBridge

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User'); // Make sure to include User model
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select('title description instructor coverImage level topics averageRating')
      .populate('instructor', 'name');

    res.json({
      status: 'success',
      count: courses.length,
      courses
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('ratings.student', 'name');

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    res.json({
      status: 'success',
      course
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Teacher/Admin)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res, next) => {
  try {
    const {
      title,
      description,
      coverImage,
      languages,
      level,
      topics,
      modules
    } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
      coverImage,
      languages,
      level,
      topics,
      modules: modules || []
    });

    res.status(201).json({
      status: 'success',
      course
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course instructor/Admin)
router.put('/:id', protect, async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this course'
      });
    }

    // Update course
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      status: 'success',
      course
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Course instructor/Admin)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this course'
      });
    }

    await course.remove();

    res.json({
      status: 'success',
      message: 'Course removed'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled
    const isEnrolled = course.enrolledStudents.some(
      (student) => student.student.toString() === req.user.id
    );

    if (isEnrolled) {
      return res.status(400).json({
        status: 'error',
        message: 'Already enrolled in this course'
      });
    }

    // Add user to course enrolledStudents
    course.enrolledStudents.push({ student: req.user.id });
    await course.save();

    // Add course to user enrolledCourses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { enrolledCourses: course._id }
    });

    res.json({
      status: 'success',
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses/:id/unenroll
// @desc    Unenroll from a course
// @access  Private
router.post('/:id/unenroll', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    const isEnrolled = course.enrolledStudents.some(
      (student) => student.student.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(400).json({
        status: 'error',
        message: 'Not enrolled in this course'
      });
    }

    // Remove user from course enrolledStudents
    course.enrolledStudents = course.enrolledStudents.filter(
      (student) => student.student.toString() !== req.user.id
    );
    await course.save();

    // Remove course from user enrolledCourses
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { enrolledCourses: course._id }
    });

    res.json({
      status: 'success',
      message: 'Successfully unenrolled from course'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses/:id/rate
// @desc    Rate a course
// @access  Private (Enrolled students only)
router.post('/:id/rate', protect, async (req, res, next) => {
  try {
    const { rating, review } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is enrolled in the course
    const isEnrolled = course.enrolledStudents.some(
      (student) => student.student.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(403).json({
        status: 'error',
        message: 'Only enrolled students can rate the course'
      });
    }

    // Check if user has already rated the course
    const existingRatingIndex = course.ratings.findIndex(
      (r) => r.student.toString() === req.user.id
    );

    if (existingRatingIndex !== -1) {
      // Update existing rating
      course.ratings[existingRatingIndex].rating = rating;
      if (review) course.ratings[existingRatingIndex].review = review;
    } else {
      // Add new rating
      course.ratings.push({
        student: req.user.id,
        rating,
        review
      });
    }

    await course.save();

    res.json({
      status: 'success',
      message: 'Rating submitted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;