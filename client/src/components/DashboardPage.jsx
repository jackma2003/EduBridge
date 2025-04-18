import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, getCourses, getCourse } from '../services/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    assignmentsDue: 0,
    totalHoursLearned: 0,
    averageGrade: 0
  });

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
        
        // Get enrolled courses - FIX HERE
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
        
        setEnrolledCourses(enrolledCoursesWithDetails);
        
        // Get recommended courses - filter out courses the student is already enrolled in
        const enrolledIds = enrolledCoursesWithDetails.map(course => course._id);
        const recommended = allCourses
          .filter(course => !enrolledIds.includes(course._id))
          .slice(0, 3); // Get top 3 recommendations
        
        setRecommendedCourses(recommended);
        
        // Calculate dashboard statistics
        const completed = enrolledCoursesWithDetails.filter(course => course.progress === 100).length;
        const totalHours = enrolledCoursesWithDetails.reduce((total, course) => {
          // Calculate total hours based on course modules and content
          const moduleHours = course.modules?.reduce((moduleTotal, module) => {
            return moduleTotal + (module.content?.reduce((contentTotal, content) => {
              return contentTotal + (content.duration || 0);
            }, 0) || 0);
          }, 0) || 0;
          
          return total + moduleHours / 60; // Convert minutes to hours
        }, 0);
        
        // Count upcoming assignments
        const dueAssignments = enrolledCoursesWithDetails.reduce((total, course) => {
          const assignments = course.modules?.reduce((moduleTotal, module) => {
            return moduleTotal + (module.content?.filter(content => 
              content.type === 'assignment' && !content.completed
            ).length || 0);
          }, 0) || 0;
          
          return total + assignments;
        }, 0);
        
        // Calculate average grade if available
        let avgGrade = 0;
        const coursesWithGrades = enrolledCoursesWithDetails.filter(course => course.grade);
        
        if (coursesWithGrades.length > 0) {
          avgGrade = (coursesWithGrades.reduce((total, course) => 
            total + (course.grade || 0), 0) / coursesWithGrades.length).toFixed(1);
        }
        
        setStats({
          coursesCompleted: completed,
          assignmentsDue: dueAssignments,
          totalHoursLearned: totalHours.toFixed(1),
          averageGrade: avgGrade
        });
        
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
    navigate('/login');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800">EduBridge</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/dashboard" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Browse Courses
                </Link>
                <Link to="/my-learning" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  My Learning
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img 
                    className="h-8 w-8 rounded-full object-cover"
                    src={student?.profilePicture ? student.profilePicture : "/default-avatar.jpg"} 
                    alt="Profile" 
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{student?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Student Dashboard Header */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={student?.profilePicture ? student.profilePicture : "/default-avatar.jpg"}
                    alt="Profile"
                  />
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Courses Completed */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Courses Completed
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stats.coursesCompleted}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignments Due */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Assignments Due
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stats.assignmentsDue}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Hours Learned */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Hours Learned
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stats.totalHoursLearned}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Grade */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Average Grade
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.averageGrade > 0 ? stats.averageGrade : 'N/A'}
                        </div>
                      </dd>
                    </dl>
                  </div>
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {enrolledCourses.map((course) => (
                    <div key={course._id} className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img 
                            className="h-16 w-16 rounded object-cover"
                            src={course.coverImage || "/default-course.jpg"} 
                            alt={course.title} 
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-500">{course.instructor?.name || 'Unknown Instructor'}</p>
                          
                          <div className="mt-2">
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{ width: `${course.progress || 0}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{course.progress || 0}% complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Link
                            to={`/courses/${course._id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Assignments Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upcoming Assignments
              </h3>
            </div>
            <div className="bg-white">
              {stats.assignmentsDue === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">You have no upcoming assignments.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {/* This would normally come from the API */}
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-blue-600">Module Quiz: Introduction to React</h4>
                        <p className="text-xs text-gray-500">Web Development Fundamentals</p>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Due in 2 days
                        </span>
                        <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                          Start
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-blue-600">Final Project: Data Analysis</h4>
                        <p className="text-xs text-gray-500">Statistics for Data Science</p>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Due in 7 days
                        </span>
                        <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                          Start
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
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
                  {recommendedCourses.map((course) => (
                    <div key={course._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="h-40 bg-gray-200 relative">
                        <img 
                          src={course.coverImage || "/default-course-cover.jpg"} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded">
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 text-lg mb-1 truncate">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{course.instructor?.name || 'Unknown Instructor'}</p>
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
                  ))}
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