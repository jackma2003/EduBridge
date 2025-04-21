import React, { useState } from 'react';

const CourseContent = ({ course }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Handle video click - redirect to the video URL in a new tab
  const handleVideoClick = (url, e) => {
    e.stopPropagation(); // Prevent toggling the module when clicking the video
    
    // Check if it's a valid URL
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      // Open video in a new tab
      window.open(url, '_blank');
    } else {
      // If URL is not valid, show an alert
      alert('Video URL is not available or invalid.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Course Content</h2>
        <p className="text-sm text-gray-500 mt-1">
          {course.modules?.length || 0} modules • {course.modules?.reduce((total, module) => total + (module.content?.length || 0), 0) || 0} lessons
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {course.modules?.map((module, moduleIndex) => (
          <div key={moduleIndex} className="bg-white overflow-hidden">
            <button
              onClick={() => setActiveModuleIndex(moduleIndex === activeModuleIndex ? -1 : moduleIndex)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  {moduleIndex === activeModuleIndex ? (
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">Module {moduleIndex + 1}: {module.title}</span>
              </div>
              <span className="text-xs text-gray-500">{module.content?.length || 0} lessons</span>
            </button>
            
            {moduleIndex === activeModuleIndex && (
              <div className="px-6 pb-4">
                {module.description && (
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                )}
                
                <ul className="space-y-2">
                  {module.content?.map((content, contentIndex) => (
                    <li key={contentIndex} className="text-sm">
                      <div 
                        className={`flex items-center p-2 rounded ${
                          content.type === 'video' ? 'hover:bg-blue-50 cursor-pointer' : 'hover:bg-gray-50'
                        }`}
                        onClick={(e) => content.type === 'video' && handleVideoClick(content.url, e)}
                      >
                        <div className="flex-shrink-0 mr-3">
                          {content.type === 'video' && (
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                          )}
                          {content.type === 'document' && (
                            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          )}
                          {content.type === 'quiz' && (
                            <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          )}
                          {content.type === 'assignment' && (
                            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-2 flex-1">
                          <span className={`font-medium ${content.type === 'video' ? 'text-blue-600' : ''}`}>
                            {content.title}
                          </span>
                          {content.duration && (
                            <span className="ml-2 text-xs text-gray-500">{content.duration} min</span>
                          )}
                          {content.description && (
                            <p className="text-xs text-gray-500 mt-1">{content.description}</p>
                          )}
                        </div>
                        {content.type === 'video' && (
                          <div className="flex-shrink-0 ml-2">
                            <svg className="h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;