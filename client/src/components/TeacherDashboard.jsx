import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getTeacherCourses } from '../services/api';

// Import components
import TeacherHeader from './teacherpage/TeacherHeader';
import TeacherDashboardHeader from './teacherpage/TeacherDashboardHeader';
import StatsCards from './teacherpage/StatsCards';
import CoursesList from './teacherpage/CoursesList';
import DeleteConfirmationModal from './teacherpage/DeleteConfirmationModal';
import { getInitials } from './teacherpage/uiHelpers';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageRating: 0,
    publishedCourses: 0,
    draftCourses: 0
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if logged in user is a teacher
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'teacher') {
      navigate('/login');
      return;
    }

    // Fetch teacher profile and courses
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        
        // Get teacher profile
        const profileResponse = await getProfile();
        
        if (profileResponse.data.user.role !== 'teacher') {
          throw new Error('Unauthorized access');
        }
        
        setTeacher(profileResponse.data.user);
        setTeacherProfile(profileResponse.data.user.teacherProfile);
        
        // Get teacher's courses
        const coursesResponse = await getTeacherCourses();
        const coursesList = coursesResponse.data.courses;
        setCourses(coursesList);
        
        // Calculate dashboard statistics
        const totalStudents = coursesList.reduce((total, course) => 
          total + (course.enrolledStudents?.length || 0), 0);
          
        const publishedCourses = coursesList.filter(course => course.isPublished).length;
        const draftCourses = coursesList.length - publishedCourses;
        
        let avgRating = 0;
        const coursesWithRatings = coursesList.filter(course => 
          course.averageRating && parseFloat(course.averageRating) > 0);
          
        if (coursesWithRatings.length > 0) {
          avgRating = (coursesWithRatings.reduce((total, course) => 
            total + parseFloat(course.averageRating || 0), 0) / coursesWithRatings.length).toFixed(1);
        }
        
        setStats({
          totalStudents,
          averageRating: avgRating,
          publishedCourses,
          draftCourses
        });
        
      } catch (err) {
        setError('Failed to load teacher data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  // Handle delete course
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Error
          </div>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const teacherInitials = getInitials(teacher?.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <TeacherHeader 
        teacher={teacher} 
        teacherInitials={teacherInitials}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Teacher Dashboard Header */}
          <TeacherDashboardHeader
            teacher={teacher}
            teacherProfile={teacherProfile}
            teacherInitials={teacherInitials}
          />

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Courses */}
          <CoursesList 
            courses={courses} 
            setCourses={setCourses}
            setStats={setStats}
            actionLoading={actionLoading}
            setActionLoading={setActionLoading}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          course={selectedCourse}
          courses={courses}
          setCourses={setCourses}
          setStats={setStats}
          actionLoading={actionLoading}
          setActionLoading={setActionLoading}
          onClose={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;