import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/DashboardPage';
import TeacherRegistrationPage from './components/TeacherRegistrationPage';
import PendingApprovalPage from './components/PendingApprovalPage';
import AdminDashboard from './components/AdminDashboard';
import InitialAdminSetup from './components/InitialAdminSetup';
import ExploreCourses from './components/ExploreCourses';
import TeacherDashboard from './components/TeacherDashboard';
import CourseCreationForm from './components/CourseCreationForm';
import CourseDetailPage from './components/CourseDetailPage';
import './index.css';

// Auth check and redirect component
const AuthCheck = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in - only run on public routes
    if (location.pathname === '/') {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (token && user) {
        // Auto-redirect to appropriate dashboard based on role
        if (user.role === 'admin') {
          window.location.href = '/admin';
        } else if (user.role === 'teacher') {
          if (user.isVerified) {
            window.location.href = '/teacher';
          } else {
            window.location.href = '/pending-approval';
          }
        } else if (user.role === 'student') {
          window.location.href = '/dashboard';
        }
      }
    }
  }, [location]);
  
  return null;
};

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
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        return <Navigate to="/admin" />;
      } else if (user.role === 'teacher') {
        if (user.isVerified) {
          return <Navigate to="/teacher" />;
        } else {
          return <Navigate to="/pending-approval" />;
        }
      } else {
        return <Navigate to="/dashboard" />;
      }
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
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  
  // Check if teacher is verified
  if (!user.isVerified) {
    return <Navigate to="/pending-approval" />;
  }
  
  return children;
};

// Public route - redirect to dashboard if logged in
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (isAuthenticated) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (user.role === 'teacher') {
      if (user.isVerified) {
        return <Navigate to="/teacher" />;
      } else {
        return <Navigate to="/pending-approval" />;
      }
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthCheck />
      <div className="App">
        <Routes>
          {/* Public routes - will redirect if logged in */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="/register/teacher" element={
            <PublicRoute>
              <TeacherRegistrationPage />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/setup-admin" element={<InitialAdminSetup />} />
          
          {/* Course routes - accessible to all (even without login) */}
          <Route path="/courses" element={<ExploreCourses />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute requiredRole="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          
          <Route 
            path="/pending-approval" 
            element={
              <PrivateRoute>
                <PendingApprovalPage />
              </PrivateRoute>
            }
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
          {/* Edit course route */}
          <Route 
            path="/courses/edit/:id" 
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