import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import TeacherRegistrationPage from './components/TeacherRegistrationPage';
import PendingApprovalPage from './components/PendingApprovalPage';
import AdminDashboard from './components/AdminDashboard';
import InitialAdminSetup from './components/InitialAdminSetup';
import ExploreCourses from './components/ExploreCourses';
import TeacherDashboard from './components/TeacherDashboard';
import CourseCreationForm from './components/CourseCreationForm';
import './index.css';

// Private route component to protect routes that require authentication
const PrivateRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If a specific role is required, check for it
  if (requiredRole) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== requiredRole) {
      // Redirect to dashboard if authenticated but wrong role
      return <Navigate to="/dashboard" />;
    }
  }
  
  return children;
};

// Route for teacher check (must be verified)
const TeacherRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Check if user is a teacher
  if (user.role !== 'teacher') {
    return <Navigate to="/dashboard" />;
  }
  
  // Check if teacher is verified
  if (!user.isVerified) {
    return <Navigate to="/pending-approval" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/teacher" element={<TeacherRegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup-admin" element={<InitialAdminSetup />} />
          <Route path="/courses" element={<ExploreCourses />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          
          <Route 
            path="/pending-approval" 
            element={<PendingApprovalPage />}
          />
          
          {/* Teacher routes */}
          <Route 
            path="/teacher" 
            element={
              <TeacherRoute>
                <TeacherDashboard />
              </TeacherRoute>
            }
          />
          <Route 
            path="/courses/create" 
            element={
              <TeacherRoute>
                <CourseCreationForm />
              </TeacherRoute>
            }
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;