const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's progress
router.get(
  '/me',
  authMiddleware.protect,
  progressController.getMyProgress
);

// Get user's progress for a specific course
router.get(
  '/me/courses/:courseId',
  authMiddleware.protect,
  progressController.getMyCourseProgress
);

// Update progress for a lesson
router.post(
  '/courses/:courseId/lessons/:lessonId',
  authMiddleware.protect,
  progressController.updateLessonProgress
);

// Mark a module as completed
router.post(
  '/courses/:courseId/modules/:moduleId/complete',
  authMiddleware.protect,
  progressController.completeModule
);

// Mark a lesson as completed
router.post(
  '/courses/:courseId/lessons/:lessonId/complete',
  authMiddleware.protect,
  progressController.completeLesson
);

// Save notes for a lesson
router.post(
  '/courses/:courseId/lessons/:lessonId/notes',
  authMiddleware.protect,
  progressController.saveNotes
);

// Update notes for a lesson
router.put(
  '/courses/:courseId/lessons/:lessonId/notes/:noteId',
  authMiddleware.protect,
  progressController.updateNotes
);

// Delete notes for a lesson
router.delete(
  '/courses/:courseId/lessons/:lessonId/notes/:noteId',
  authMiddleware.protect,
  progressController.deleteNotes
);

// Add a bookmark
router.post(
  '/courses/:courseId/lessons/:lessonId/bookmarks',
  authMiddleware.protect,
  progressController.addBookmark
);

// Delete a bookmark
router.delete(
  '/courses/:courseId/lessons/:lessonId/bookmarks/:bookmarkId',
  authMiddleware.protect,
  progressController.deleteBookmark
);

// Get a user's certificate for a course
router.get(
  '/courses/:courseId/certificate',
  authMiddleware.protect,
  progressController.getCertificate
);

// Instructor routes to view student progress
router.get(
  '/courses/:courseId/students',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  progressController.getCourseStudentsProgress
);

router.get(
  '/courses/:courseId/students/:userId',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  progressController.getStudentCourseProgress
);

// Synchronize offline progress
router.post(
  '/sync',
  authMiddleware.protect,
  progressController.syncProgress
);

module.exports = router;