import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { markContentCompleted } from '../../services/api';

const AssignmentItem = ({ assignment }) => {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Determine color based on days remaining
  const getBadgeColor = (daysRemaining) => {
    if (daysRemaining <= 2) return 'bg-red-100 text-red-800'; // Urgent
    if (daysRemaining <= 7) return 'bg-yellow-100 text-yellow-800'; // Soon
    return 'bg-green-100 text-green-800'; // Plenty of time
  };

  // Format due text
  const getDueText = (daysRemaining) => {
    if (daysRemaining === 0) return 'Due today';
    if (daysRemaining === 1) return 'Due tomorrow';
    return `Due in ${daysRemaining} days`;
  };

  // Listen for progress updates from other components
  useEffect(() => {
    const handleProgressUpdate = (event) => {
      const { courseId, contentId, completed: wasCompleted } = event.detail;
      
      if (courseId === assignment.courseId && contentId === assignment._id && wasCompleted) {
        setCompleted(true);
      }
    };
    
    window.addEventListener('contentProgressUpdated', handleProgressUpdate);
    
    return () => {
      window.removeEventListener('contentProgressUpdated', handleProgressUpdate);
    };
  }, [assignment.courseId, assignment._id]);

  // Handle marking the assignment as complete directly from this component
  const handleMarkComplete = async () => {
    try {
      setLoading(true);
      
      await markContentCompleted(
        assignment.courseId, 
        assignment.moduleIndex, 
        assignment._id
      );
      
      setCompleted(true);
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('contentProgressUpdated', {
        detail: {
          courseId: assignment.courseId,
          contentId: assignment._id,
          moduleIndex: assignment.moduleIndex,
          contentIndex: assignment.contentIndex,
          completed: true
        }
      }));
    } catch (error) {
      console.error('Error marking assignment as complete:', error);
    } finally {
      setLoading(false);
    }
  };

  // If the assignment is completed, don't render it (optionally)
  if (completed) {
    return null; // Or render a completed version if preferred
  }

  return (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex justify-between">
        <div>
          <h4 className="text-sm font-medium text-blue-600">{assignment.title}</h4>
          <p className="text-xs text-gray-500">{assignment.courseName}</p>
        </div>
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(assignment.daysRemaining)}`}>
            {getDueText(assignment.daysRemaining)}
          </span>
          <div className="ml-4 flex space-x-2">
            <button
              onClick={handleMarkComplete}
              disabled={loading}
              className="text-xs text-green-600 hover:text-green-800"
              title="Mark as complete"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <Link 
              to={`/courses/${assignment.courseId}/modules/${assignment.moduleIndex}/content/${assignment.contentIndex}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AssignmentItem;