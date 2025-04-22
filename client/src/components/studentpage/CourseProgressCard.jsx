import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourseProgress } from '../../services/api';

const CourseProgressCard = ({ course }) => {
  const [progress, setProgress] = useState(course.progress || 0);
  const [nextContentLocation, setNextContentLocation] = useState({ courseId: course._id });
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="p-6">
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
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-500">{progress}% complete</span>
            </div>
          </div>
        </div>
        <div className="ml-4">
          {nextContentLocation.moduleIndex !== undefined ? (
            <Link
              to={`/courses/${nextContentLocation.courseId}/modules/${nextContentLocation.moduleIndex}/content/${nextContentLocation.contentIndex}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </Link>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;