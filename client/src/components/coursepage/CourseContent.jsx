import React, { useState, useEffect } from 'react';
import { getCourseProgress, markContentCompleted, resetContentProgress } from '../../services/api';
import ContentAccessModal from '../coursepage/ContentAccessModal';

const CourseContent = ({ course }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedContent, setCompletedContent] = useState({});
  const [loading, setLoading] = useState(false);
  // Add state for the access modal
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Load completed content from backend on component mount
  useEffect(() => {
    const fetchCompletedContent = async () => {
      try {
        // Only fetch if user is logged in
        const token = localStorage.getItem('token');
        if (!token || !course?._id) return;

        const response = await getCourseProgress(course._id);
        
        // Transform the data into a map for easier lookup
        const completedMap = {};
        if (response.data && response.data.completedContent) {
          response.data.completedContent.forEach(item => {
            completedMap[item.contentId] = true;
          });
        }
        
        setCompletedContent(completedMap);
      } catch (error) {
        console.error('Error fetching completed content:', error);
      }
    };

    fetchCompletedContent();
  }, [course]);

  // Check if user is logged in and enrolled
  const checkAccessPermission = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Check if user is enrolled in this course
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) return false;
    
    // Check if the user is enrolled in this course
    const isEnrolled = course.enrolledStudents?.some(
      enrollment => enrollment.student === user.id || 
                    (enrollment.student && enrollment.student._id === user.id)
    );
    
    return isEnrolled;
  };

  // Handle content click - redirect to the content URL in a new tab
  const handleContentClick = async (content, moduleIndex, contentIndex, e) => {
    e.stopPropagation(); // Prevent toggling the module when clicking the content
    
    // Check access permission first
    const hasAccess = checkAccessPermission();
    
    if (!hasAccess) {
      // If no access, show the modal instead of opening the URL
      setSelectedContent(content);
      setShowAccessModal(true);
      return;
    }
    
    // Check if it's a valid URL
    if (content.url && (content.url.startsWith('http://') || content.url.startsWith('https://'))) {
      // Open content in a new tab
      window.open(content.url, '_blank');
      
      // Mark as completed if user is logged in and content is not already completed
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (token && user && content._id && !completedContent[content._id]) {
        try {
          setLoading(true);
          
          // Mark content as completed using the existing API
          await markContentCompleted(course._id, moduleIndex, content._id);
          
          // Update local state
          setCompletedContent(prev => ({
            ...prev,
            [content._id]: true
          }));
          
          // Dispatch custom event to notify other components about the progress update
          window.dispatchEvent(new CustomEvent('contentProgressUpdated', {
            detail: {
              courseId: course._id,
              contentId: content._id,
              moduleIndex,
              contentIndex,
              completed: true
            }
          }));
        } catch (error) {
          console.error('Error marking content as completed:', error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      // If URL is not valid, show an alert
      alert(`${content.type.charAt(0).toUpperCase() + content.type.slice(1)} URL is not available or invalid.`);
    }
  };

  // Handle resetting a lesson's progress
  const handleResetLesson = async (content, moduleIndex, e) => {
    e.stopPropagation(); // Prevent any parent click events
    
    // Only proceed if the content is already completed
    if (!completedContent[content._id]) return;
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user && content._id) {
      try {
        setLoading(true);
        
        // Reset the content progress using the existing API
        await resetContentProgress(course._id, moduleIndex, content._id);
        
        // Update local state
        const updatedCompletedContent = { ...completedContent };
        delete updatedCompletedContent[content._id];
        setCompletedContent(updatedCompletedContent);
        
        // Dispatch custom event to notify other components about the progress update
        window.dispatchEvent(new CustomEvent('contentProgressUpdated', {
          detail: {
            courseId: course._id,
            contentId: content._id,
            moduleIndex,
            completed: false
          }
        }));
      } catch (error) {
        console.error('Error resetting lesson progress:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Close the access modal
  const handleCloseModal = () => {
    setShowAccessModal(false);
    setSelectedContent(null);
  };

  return (
    <>
      {/* Access Modal */}
      <ContentAccessModal 
        showModal={showAccessModal} 
        handleClose={handleCloseModal} 
        contentTitle={selectedContent?.title}
        contentType={selectedContent?.type}
      />
      
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
                        <div className="flex items-center p-2 rounded hover:bg-blue-50">
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
                            <div className="flex items-center">
                              <span className={`font-medium ${completedContent[content._id] ? 'text-green-600' : 'text-blue-600'}`}>
                                {content.title}
                                {completedContent[content._id] && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                )}
                              </span>
                            </div>
                            {content.duration && (
                              <span className="text-xs text-gray-500 mt-1 block">{content.duration} min</span>
                            )}
                            {content.description && (
                              <p className="text-xs text-gray-500 mt-1">{content.description}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 ml-2 flex space-x-2">
                            {completedContent[content._id] && (
                              <button
                                onClick={(e) => handleResetLesson(content, moduleIndex, e)}
                                className="inline-flex items-center p-1 border border-transparent rounded text-gray-500 hover:bg-gray-100 focus:outline-none"
                                title="Restart lesson"
                                disabled={loading}
                              >
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                              </button>
                            )}
                            
                            <button
                              onClick={(e) => handleContentClick(content, moduleIndex, contentIndex, e)}
                              className="inline-flex items-center p-1 border border-transparent rounded text-blue-500 hover:bg-blue-100 focus:outline-none cursor-pointer"
                              title="Open content"
                              disabled={loading}
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </button>
                          </div>
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
    </>
  );
};

export default CourseContent;