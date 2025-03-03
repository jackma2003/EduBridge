const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.get('/slug/:slug', courseController.getCourseBySlug);

// Routes requiring authentication
router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.createCourse
);

router.put(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.updateCourse
);

router.delete(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.deleteCourse
);

// Module routes
router.post(
  '/:courseId/modules',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.addModule
);

router.put(
  '/:courseId/modules/:moduleId',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.updateModule
);

router.delete(
  '/:courseId/modules/:moduleId',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.deleteModule
);

// Lesson routes
router.post(
  '/:courseId/modules/:moduleId/lessons',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.addLesson
);

router.put(
  '/:courseId/modules/:moduleId/lessons/:lessonId',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.updateLesson
);

router.delete(
  '/:courseId/modules/:moduleId/lessons/:lessonId',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  courseController.deleteLesson
);

// Enrollment routes
router.post(
  '/:id/enroll',
  authMiddleware.protect,
  courseController.enrollInCourse
);

router.delete(
  '/:id/unenroll',
  authMiddleware.protect,
  courseController.unenrollFromCourse
);

// Review routes
router.post(
  '/:id/reviews',
  authMiddleware.protect,
  courseController.addReview
);

router.put(
  '/:id/reviews/:reviewId',
  authMiddleware.protect,
  courseController.updateReview
);

router.delete(
  '/:id/reviews/:reviewId',
  authMiddleware.protect,
  courseController.deleteReview
);

module.exports = router;