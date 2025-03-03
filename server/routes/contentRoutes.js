const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

// Basic content routes
router.get(
  '/:id',
  authMiddleware.protect,
  contentController.getContentById
);

router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.createContent
);

router.put(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.updateContent
);

router.delete(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.deleteContent
);

// Video content specific routes
router.post(
  '/video',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.uploadVideo
);

// Document content specific routes
router.post(
  '/document',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.uploadDocument
);

// Quiz specific routes
router.post(
  '/:id/submit-quiz',
  authMiddleware.protect,
  contentController.submitQuiz
);

// Assignment specific routes
router.post(
  '/:id/submit-assignment',
  authMiddleware.protect,
  contentController.submitAssignment
);

router.get(
  '/course/:courseId',
  authMiddleware.protect,
  contentController.getContentByCourse
);

router.post(
  '/:id/versions',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.createContentVersion
);

router.get(
  '/:id/versions',
  authMiddleware.protect,
  contentController.getContentVersions
);

router.get(
  '/:id/versions/:versionId',
  authMiddleware.protect,
  contentController.getContentVersionById
);

// Translation routes
router.post(
  '/:id/translations',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.addContentTranslation
);

router.put(
  '/:id/translations/:languageCode',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.updateContentTranslation
);

router.delete(
  '/:id/translations/:languageCode',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.deleteContentTranslation
);

// Access control routes
router.put(
  '/:id/access',
  authMiddleware.protect,
  authMiddleware.authorize('instructor', 'admin'),
  contentController.updateContentAccess
);

module.exports = router;