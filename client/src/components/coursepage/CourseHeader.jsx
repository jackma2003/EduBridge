import React from 'react';

const CourseHeader = ({ course }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get instructor initials for avatar
  const getInitials = (name) => {
    if (!name) return "IN";
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

  const bgGradient = generateBgColor(course.title);
  const instructorInitials = getInitials(course.instructor?.name);

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
      <div className="relative h-64">
        {/* Gradient background instead of image */}
        <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </span>
            {course.topics?.slice(0, 3).map((topic, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {topic}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-white">
                {course.averageRating || '0.0'} ({course.ratings?.length || 0} ratings)
              </span>
            </div>
            <span className="mx-2 text-white">•</span>
            <span className="text-white">{course.enrolledStudents?.length || 0} students enrolled</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Initial-based avatar instead of image */}
            <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-medium text-lg bg-gray-700">
              {instructorInitials}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Instructor: {course.instructor?.name || 'Unknown Instructor'}
            </p>
            <p className="text-sm text-gray-500">
              Created: {formatDate(course.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;