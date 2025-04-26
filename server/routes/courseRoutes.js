// routes/courseRoutes.js - Course routes for EduBridge

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
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

// @route   GET /api/courses/:id/students
// @desc    Get all students enrolled in a course
// @access  Private (Course instructor/Admin)
router.get('/:id/students', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'enrolledStudents.student',
        select: 'name email profilePicture'
      });

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
        message: 'Not authorized to view the student list for this course'
      });
    }

    // Return the enrolled students
    res.json({
      status: 'success',
      courseTitle: course.title,
      students: course.enrolledStudents
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
// @desc    Enroll in a course (students only)
// @access  Private
router.post('/:id/enroll', protect, async (req, res, next) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({
        status: 'error',
        message: 'Only students can enroll in courses'
      });
    }

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

// Replace the existing rating route in courseRoutes.js

// @route   POST /api/courses/:id/rate
// @desc    Rate a course
// @access  Private (Enrolled students only)
router.post('/:id/rate', protect, async (req, res, next) => {
  try {
    const { rating, review } = req.body;

    // Convert rating to a number if it's not already
    const numericRating = Number(rating);
    
    // Validate the rating
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        status: 'error',
        message: 'Rating must be a number between 1 and 5'
      });
    }

    // Find the course
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
      course.ratings[existingRatingIndex].rating = numericRating;
      if (review !== undefined) {
        course.ratings[existingRatingIndex].review = review;
      }
    } else {
      // Add new rating
      course.ratings.push({
        student: req.user.id,
        rating: numericRating,
        review: review || ''
      });
    }

    // Save the course - the pre-save hook will calculate the new average
    await course.save();

    res.json({
      status: 'success',
      message: 'Rating submitted successfully',
      averageRating: course.averageRating,
      ratingCount: course.ratings.length
    });
  } catch (error) {
    console.error('Rating error:', error);
    next(error);
  }
});

// @route   GET /api/courses/:id/progress
// @desc    Get course progress for the current user
// @access  Private
router.get('/:id/progress', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Find the user's enrollment in this course
    const enrollment = course.enrolledStudents.find(
      student => student.student.toString() === req.user.id
    );

    if (!enrollment) {
      return res.status(400).json({
        status: 'error',
        message: 'You are not enrolled in this course'
      });
    }

    // Get user's completed content
    // Note: This assumes you've added a completedContent array to the enrollment schema
    const completedContent = enrollment.completedContent || [];

    res.json({
      status: 'success',
      courseId: course._id,
      progress: enrollment.progress,
      completedContent
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/courses/:id/modules/:moduleIndex/content/:contentId/complete
// @desc    Mark a specific content item as completed
// @access  Private
router.put('/:id/modules/:moduleIndex/content/:contentId/complete', protect, async (req, res, next) => {
  try {
    const { id, moduleIndex, contentId } = req.params;
    
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Find the user's enrollment in this course
    const enrollmentIndex = course.enrolledStudents.findIndex(
      student => student.student.toString() === req.user.id
    );

    if (enrollmentIndex === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'You are not enrolled in this course'
      });
    }

    // Verify module and content exist
    if (!course.modules[moduleIndex] || !course.modules[moduleIndex].content.some(c => c._id.toString() === contentId)) {
      return res.status(404).json({
        status: 'error',
        message: 'Module or content not found'
      });
    }

    // Initialize completedContent array if it doesn't exist
    if (!course.enrolledStudents[enrollmentIndex].completedContent) {
      course.enrolledStudents[enrollmentIndex].completedContent = [];
    }

    // Check if content is already marked as completed
    const completedContentIndex = course.enrolledStudents[enrollmentIndex].completedContent.findIndex(
      c => c.contentId.toString() === contentId
    );

    // If not completed yet, add it
    if (completedContentIndex === -1) {
      course.enrolledStudents[enrollmentIndex].completedContent.push({
        contentId,
        moduleIndex: Number(moduleIndex),
        completedAt: new Date()
      });

      // Recalculate progress percentage
      const totalContentItems = course.modules.reduce(
        (total, module) => total + module.content.length, 0
      );
      
      const completedCount = course.enrolledStudents[enrollmentIndex].completedContent.length;
      const progress = totalContentItems > 0 ? Math.round((completedCount / totalContentItems) * 100) : 0;
      
      course.enrolledStudents[enrollmentIndex].progress = progress;
      
      await course.save();
    }

    res.json({
      status: 'success',
      message: 'Content marked as completed',
      progress: course.enrolledStudents[enrollmentIndex].progress
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/courses/:id/modules/:moduleIndex/content/:contentId/reset
// @desc    Reset a specific content item's completion status
// @access  Private
router.put('/:id/modules/:moduleIndex/content/:contentId/reset', protect, async (req, res, next) => {
  try {
    const { id, moduleIndex, contentId } = req.params;
    
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Find the user's enrollment in this course
    const enrollmentIndex = course.enrolledStudents.findIndex(
      student => student.student.toString() === req.user.id
    );

    if (enrollmentIndex === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'You are not enrolled in this course'
      });
    }

    // Remove the content from the completedContent array
    if (course.enrolledStudents[enrollmentIndex].completedContent) {
      course.enrolledStudents[enrollmentIndex].completedContent = 
        course.enrolledStudents[enrollmentIndex].completedContent.filter(
          c => c.contentId.toString() !== contentId
        );
      
      // Recalculate progress percentage
      const totalContentItems = course.modules.reduce(
        (total, module) => total + module.content.length, 0
      );
      
      const completedCount = course.enrolledStudents[enrollmentIndex].completedContent.length;
      const progress = totalContentItems > 0 ? Math.round((completedCount / totalContentItems) * 100) : 0;
      
      course.enrolledStudents[enrollmentIndex].progress = progress;
      
      await course.save();
    }

    res.json({
      status: 'success',
      message: 'Content progress reset',
      progress: course.enrolledStudents[enrollmentIndex].progress
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses/:id/remove-student
// @desc    Allow an instructor to remove a student from their course
// @access  Private (Course instructor/Admin only)
router.post('/:id/remove-student', protect, async (req, res, next) => {
  try {
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
        status: 'error',
        message: 'Student ID is required'
      });
    }
    
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
        message: 'Not authorized to remove students from this course'
      });
    }

    // Check if student is enrolled
    const isEnrolled = course.enrolledStudents.some(
      (student) => student.student.toString() === studentId
    );

    if (!isEnrolled) {
      return res.status(400).json({
        status: 'error',
        message: 'Student is not enrolled in this course'
      });
    }

    // Remove student from course enrolledStudents
    course.enrolledStudents = course.enrolledStudents.filter(
      (student) => student.student.toString() !== studentId
    );
    await course.save();

    // Remove course from student's enrolledCourses
    await User.findByIdAndUpdate(studentId, {
      $pull: { enrolledCourses: course._id }
    });

    res.json({
      status: 'success',
      message: 'Student successfully removed from course'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;