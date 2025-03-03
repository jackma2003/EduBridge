const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for user registration and authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', authMiddleware.protect, userController.getMe);
router.put('/profile', authMiddleware.protect, userController.updateProfile);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password/:resetToken', userController.resetPassword);

// Admin routes for user management
router.get(
  '/',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  userController.getUsers
);

router.get(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  userController.getUserById
);

router.put(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  userController.updateUser
);

router.delete(
  '/:id',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  userController.deleteUser
);

module.exports = router;