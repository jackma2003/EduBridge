// client/src/services/api.js
import axios from 'axios';

// Get the base URL based on environment
const getBaseUrl = () => {
  // If we're in production, use relative URLs
  if (process.env.NODE_ENV === 'production') {
    return '/api';
  }
  // In development, use the full URL to your API server
  return 'http://localhost:5001/api';
};

const API = axios.create({
  baseURL: getBaseUrl()
});

// Add token to requests if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle common errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User/Auth Endpoints
export const login = (email, password) => API.post('/users/login', { email, password });
export const register = (userData) => API.post('/users/register', userData);
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (userData) => API.put('/users/profile', userData);
export const checkInitialAdmin = () => API.post('/users/init-admin', { checkOnly: true });
export const createInitialAdmin = (adminData) => API.post('/users/init-admin', adminData);

// Admin Endpoints
export const getAllUsers = () => API.get('/users');
export const getPendingTeachers = () => API.get('/users/teachers/pending');
export const approveTeacher = (id) => API.put(`/users/teachers/${id}/approve`, {});
export const rejectTeacher = (id, reason) => API.put(`/users/teachers/${id}/reject`, { reason });
export const registerAdmin = (adminData) => API.post('/users/register/admin', adminData);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
export const editUser = (userId, userData) => API.put(`/users/${userId}`, userData);
export const verifyUser = (userId) => API.put(`/users/${userId}/verify`, {});

// Teacher Endpoints
export const registerTeacher = (teacherData) => API.post('/users/register/teacher', teacherData);
export const getTeacherCourses = () => API.get('/users/courses');
export const getTeacherStudents = () => API.get('/teachers/students');
export const getTeacherAnalytics = () => API.get('/teachers/analytics');

// Course Endpoints
export const getCourses = () => API.get('/courses');
export const getCourse = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData) => API.post('/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const deleteCourse = async (id) => {
  try {
    const response = await API.delete(`/courses/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting course:', error);
    
    // Extract the error message from the response if possible
    const errorMessage = error.response?.data?.message || 'An error occurred while deleting the course';
    
    // Rethrow a more informative error
    throw new Error(errorMessage);
  }
};
export const enrollCourse = (id) => API.post(`/courses/${id}/enroll`);
export const unenrollCourse = (id) => API.post(`/courses/${id}/unenroll`);
// Get all students enrolled in a specific course
export const getCourseStudents = (courseId) => API.get(`/courses/${courseId}/students`);
// Remove a student from a course (for instructor)
export const removeStudentFromCourse = (courseId, studentId) => 
  API.post(`/courses/${courseId}/remove-student`, { studentId });
export const rateCourse = (id, ratingData) => {
  // Ensure the rating is a number between 1-5
  const validatedRating = {
    ...ratingData,
    rating: Number(ratingData.rating)
  };
  
  // Validate rating is between 1-5
  if (isNaN(validatedRating.rating) || validatedRating.rating < 1 || validatedRating.rating > 5) {
    return Promise.reject(new Error('Rating must be a number between 1 and 5'));
  }
  
  return API.post(`/courses/${id}/rate`, validatedRating);
};

// Course Progress Endpoints
export const updateModuleProgress = (courseId, moduleId, progress) => 
  API.put(`/courses/${courseId}/modules/${moduleId}/progress`, { progress });

export const completeContent = (courseId, moduleId, contentId) => 
  API.put(`/courses/${courseId}/modules/${moduleId}/content/${contentId}/complete`, {});

export const markVideoWatched = (courseId, moduleId, contentId) =>
  API.put(`/courses/${courseId}/modules/${moduleId}/content/${contentId}/watch`, {});

// Get course progress for current user
export const getCourseProgress = (courseId) => API.get(`/courses/${courseId}/progress`);

// Mark content as completed
export const markContentCompleted = (courseId, moduleIndex, contentId) => 
  API.put(`/courses/${courseId}/modules/${moduleIndex}/content/${contentId}/complete`);

// Reset content progress
export const resetContentProgress = (courseId, moduleIndex, contentId) => 
  API.put(`/courses/${courseId}/modules/${moduleIndex}/content/${contentId}/reset`);

// Learning Goals API functions
export const getLearningGoals = () => API.get('/users/learning-goals');
export const createLearningGoal = (goalData) => API.post('/users/learning-goals', goalData);
export const updateLearningGoal = (goalId, goalData) => API.put(`/users/learning-goals/${goalId}`, goalData);
export const deleteLearningGoal = (goalId) => API.delete(`/users/learning-goals/${goalId}`);

// Study Calendar API functions
export const getStudySessions = () => API.get('/users/study-sessions');
export const createStudySession = (sessionData) => API.post('/users/study-sessions', sessionData);
export const updateStudySession = (sessionId, sessionData) => API.put(`/users/study-sessions/${sessionId}`, sessionData);
export const deleteStudySession = (sessionId) => API.delete(`/users/study-sessions/${sessionId}`);

// Additional helper functions for User management
export const getCurrentUser = () => getProfile();
export const updateUserProfile = (userData) => updateProfile(userData);
export const changePassword = (passwordData) => API.put('/users/change-password', passwordData);
export const forgotPassword = (email) => API.post('/users/forgot-password', { email });
export const resetPassword = (token, newPassword) => API.post('/users/reset-password', { token, newPassword });
export const verifyEmail = (token) => API.get(`/users/verify-email/${token}`);

export default API;