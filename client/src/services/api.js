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

// User Endpoints
export const login = (email, password) => API.post('/users/login', { email, password });
export const register = (userData) => API.post('/users/register', userData);
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (userData) => API.put('/users/profile', userData);
export const registerTeacher = (teacherData) => API.post('/users/register/teacher', teacherData);
export const checkInitialAdmin = () => API.post('/users/init-admin', { checkOnly: true });
export const createInitialAdmin = (adminData) => API.post('/users/init-admin', adminData);

// Admin Endpoints
export const getAllUsers = () => API.get('/users');
export const getPendingTeachers = () => API.get('/users/teachers/pending');
export const approveTeacher = (id) => API.put(`/users/teachers/${id}/approve`, {});
export const rejectTeacher = (id, reason) => API.put(`/users/teachers/${id}/reject`, { reason });
export const registerAdmin = (adminData) => API.post('/users/register/admin', adminData);

// Course Endpoints
export const getCourses = () => API.get('/courses');
export const getCourse = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData) => API.post('/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const enrollCourse = (id) => API.post(`/courses/${id}/enroll`);
export const rateCourse = (id, ratingData) => API.post(`/courses/${id}/rate`, ratingData);

// Teacher Endpoints
export const getTeacherCourses = () => API.get('/users/courses');
export const getTeacherStudents = () => API.get('/teachers/students');
export const getTeacherAnalytics = () => API.get('/teachers/analytics');