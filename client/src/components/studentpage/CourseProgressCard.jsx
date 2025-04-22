import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCourseProgress } from '../../services/api';

const CourseProgressCard = ({ course }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(course.progress || 0);
  const [nextContentLocation, setNextContentLocation] = useState({ courseId: course._id });
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

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

  // Add a useEffect to refresh progress when the component mounts and listen for progress updates
  useEffect(() => {
    const fetchCurrentProgress = async () => {
      try {
        setLoading(true);
        const progressResponse = await getCourseProgress(course._id);
        
        if (!progressResponse.data) {
          setLoading(false);
          return;
        }
        
        // Get the current progress percentage
        setProgress(progressResponse.data.progress || 0);

        // Extract completed content
        const completedContentIds = progressResponse.data.completedContent.map(item => item.contentId);
        
        // If there are any completed content items, we know the user has started the course
        if (completedContentIds.length > 0) {
          setHasStarted(true);
        }
        
        // Find the next uncompleted content
        let nextModuleIndex = -1;
        let nextContentIndex = -1;
        
        // Loop through course modules to find the next uncompleted content
        outer:
        for (let m = 0; m < course.modules?.length; m++) {
          const module = course.modules[m];
          for (let c = 0; c < module.content?.length; c++) {
            const content = module.content[c];
            if (!completedContentIds.includes(content._id)) {
              nextModuleIndex = m;
              nextContentIndex = c;
              break outer;
            }
          }
        }
        
        // If we found an uncompleted content, set it as the next location
        if (nextModuleIndex !== -1 && nextContentIndex !== -1) {
          setNextContentLocation({
            courseId: course._id,
            moduleIndex: nextModuleIndex,
            contentIndex: nextContentIndex
          });
        } else if (completedContentIds.length > 0) {
          // If all content is completed, set the last content as the location
          const lastContent = progressResponse.data.completedContent[progressResponse.data.completedContent.length - 1];
          
          // Find the content in the modules
          for (let m = 0; m < course.modules?.length; m++) {
            const module = course.modules[m];
            for (let c = 0; c < module.content?.length; c++) {
              const content = module.content[c];
              if (content._id === lastContent.contentId) {
                setNextContentLocation({
                  courseId: course._id,
                  moduleIndex: m,
                  contentIndex: c
                });
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching latest progress for course ${course._id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProgress();
    
    // Set up an event listener to refresh progress when user marks content as completed
    const handleProgressUpdate = (event) => {
      if (event.detail.courseId === course._id) {
        fetchCurrentProgress();
      }
    };
    
    window.addEventListener('contentProgressUpdated', handleProgressUpdate);
    
    return () => {
      window.removeEventListener('contentProgressUpdated', handleProgressUpdate);
    };
  }, [course._id, course.modules]);

  // Handle continue button click with navigation check
  const handleContinueClick = (e) => {
    e.preventDefault();
    
    // If we don't have valid module/content indices but the user has started the course
    if ((nextContentLocation.moduleIndex === undefined || nextContentLocation.contentIndex === undefined) && hasStarted) {
      // Navigate to course overview page first
      navigate(`/courses/${course._id}`);
      return;
    }
    
    // Default navigation to the specific content
    navigate(`/courses/${course._id}/modules/${nextContentLocation.moduleIndex || 0}/content/${nextContentLocation.contentIndex || 0}`);
  };

  // Handle start button click
  const handleStartClick = (e) => {
    e.preventDefault();
    navigate(`/courses/${course._id}`);
  };

  const bgGradient = generateBgColor(course.title);
  const instructorInitials = getInitials(course.instructor?.name);

  return (
    <div className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Gradient background instead of image */}
          <div className={`h-16 w-16 rounded bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
            <span className="text-white font-medium text-xs">
              {course.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
            {/* Instructor avatar */}
            <div className="ml-2 flex items-center">
              <div className="h-6 w-6 rounded-full flex items-center justify-center text-white font-medium text-xs bg-gray-700 mr-1">
                {instructorInitials}
              </div>
              <p className="text-sm text-gray-500">{course.instructor?.name || 'Unknown Instructor'}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-500">{progress}% complete</span>
            </div>
          </div>
        </div>
        <div className="ml-4">
          {/* Use button with onClick handler instead of Link to better handle navigation logic */}
          {(nextContentLocation.moduleIndex !== undefined || hasStarted) ? (
            <button
              onClick={handleContinueClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleStartClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;