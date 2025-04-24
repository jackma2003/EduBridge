import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, getCourses, getCourse } from '../services/api';

// Import components
import CourseProgressCard from '../components/studentpage/CourseProgressCard';
import LearningGoals from '../components/studentpage/LearningGoals';
import StudyCalendar from '../components/studentpage/StudyCalendar';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "ST";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate a background color based on the course title
  const generateBgColor = (title) => {
    const colors = [
      'from-blue-500 to-indigo-700',
      'from-purple-500 to-pink-600',
      'from-green-500 to-teal-600',
      'from-orange-400 to-red-600',
      'from-cyan-500 to-blue-600'
    ];
    
    // Simple hash function to pick a color consistently
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if logged in user is a student
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'student') {
      // Redirect to appropriate dashboard
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'teacher') {
        if (user.isVerified) {
          navigate('/teacher');
        } else {
          navigate('/pending-approval');
        }
      }
      return;
    }

    // Fetch student profile and courses
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        
        // Get student profile
        const profileResponse = await getProfile();
        
        if (profileResponse.data.user.role !== 'student') {
          throw new Error('Unauthorized access');
        }
        
        setStudent(profileResponse.data.user);
        
        // Get enrolled courses
        const enrolledCourseIds = profileResponse.data.user.enrolledCourses || [];
        
        // Get all courses first
        const allCoursesResponse = await getCourses();
        const allCourses = allCoursesResponse.data.courses;
        
        // Extract enrolled courses with full details
        let enrolledCoursesWithDetails = [];
        
        if (enrolledCourseIds.length > 0) {
          // If enrolledCourses contains full objects with _id property
          if (typeof enrolledCourseIds[0] === 'object' && enrolledCourseIds[0]._id) {
            const enrolledIds = enrolledCourseIds.map(course => course._id);
            enrolledCoursesWithDetails = allCourses.filter(course => 
              enrolledIds.includes(course._id)
            );
          } 
          // If enrolledCourses contains just ID strings
          else if (typeof enrolledCourseIds[0] === 'string') {
            enrolledCoursesWithDetails = allCourses.filter(course => 
              enrolledCourseIds.includes(course._id)
            );
          }
          // If each enrolled course is just an ID
          else {
            // Fetch each course individually if needed
            for (const courseId of enrolledCourseIds) {
              try {
                const courseResponse = await getCourse(
                  typeof courseId === 'object' ? courseId._id : courseId
                );
                if (courseResponse.data.course) {
                  enrolledCoursesWithDetails.push(courseResponse.data.course);
                }
              } catch (courseErr) {
                console.error('Error fetching individual course:', courseErr);
              }
            }
          }
        }
        
        // Add mock progress to each course for demo purposes
        const coursesWithProgress = enrolledCoursesWithDetails.map(course => {
          // Generate a random progress percentage for demo
          const progress = Math.floor(Math.random() * 100);
          return {
            ...course,
            progress
          };
        });
        
        setEnrolledCourses(coursesWithProgress);
        
        // Get recommended courses - filter out courses the student is already enrolled in
        const enrolledIds = coursesWithProgress.map(course => course._id);
        const recommended = allCourses
          .filter(course => !enrolledIds.includes(course._id))
          .slice(0, 3); // Get top 3 recommendations
        
        setRecommendedCourses(recommended);
        
      } catch (err) {
        console.error(err);
        setError('Failed to load student data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Force a full page reload to clear any state
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

  const studentInitials = getInitials(student?.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation - Updated to match the homepage header */}
      <header className="bg-white backdrop-blur-md bg-opacity-90 sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduBridge
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide">Learning Without Boundaries</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group border-blue-500 border-b-2 pb-1">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button 
                onClick={() => scrollToSection('learning-goals')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group bg-transparent border-none cursor-pointer"
              >
                Learning Goals
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('my-calendar')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group bg-transparent border-none cursor-pointer"
              >
                My Calendar
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Browse Courses
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-600">
                  {studentInitials}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{student?.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Student Dashboard Header */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Initials-based avatar instead of profile picture */}
                  <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-medium text-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    {studentInitials}
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, {student?.name}!</h2>
                  <p className="text-sm font-medium text-gray-500">
                    Continue your learning journey
                  </p>
                </div>
                <div className="ml-auto">
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
                  >
                    <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Enroll in New Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Continue Learning
              </h3>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {enrolledCourses.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {enrolledCourses.map((course) => (
                    <CourseProgressCard 
                      key={course._id}
                      course={course}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* New Learning Goals Component */}
          <div className="mb-8" id="learning-goals">
            <LearningGoals />
          </div>

          {/* New Study Calendar Component */}
          <div className="mb-8" id="my-calendar">
            <StudyCalendar />
          </div>

          {/* Recommended Courses Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recommended For You
              </h3>
            </div>
            <div className="bg-white p-6">
              {recommendedCourses.length === 0 ? (
                <p className="text-gray-500 text-center">No recommendations available at this time.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => {
                    const bgGradient = generateBgColor(course.title);
                    const instructorInitials = getInitials(course.instructor?.name);
                    
                    return (
                      <div key={course._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                        <div className="h-40 relative">
                          {/* Gradient background instead of image */}
                          <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`}></div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded">
                              {course.level && course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            {/* Initials-based avatar instead of profile picture */}
                            <div className="h-6 w-6 rounded-full flex items-center justify-center text-white font-medium text-xs bg-gray-700 mr-2">
                              {instructorInitials}
                            </div>
                            <p className="text-sm text-gray-600">{course.instructor?.name || 'Unknown Instructor'}</p>
                          </div>
                          <h4 className="font-medium text-gray-900 text-lg mb-1 truncate">{course.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <svg className="h-4 w-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {course.averageRating || '0.0'} ({course.ratings?.length || 0} ratings)
                          </div>
                          <Link
                            to={`/courses/${course._id}`}
                            className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Course
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-6 text-center">
                <Link
                  to="/courses"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Browse all courses <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;