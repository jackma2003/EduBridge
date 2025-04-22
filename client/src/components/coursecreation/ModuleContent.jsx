import React from 'react';

const ModuleContent = ({ 
  moduleIndex, 
  content, 
  handleContentChange, 
  removeContent 
}) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h6 className="text-sm font-medium text-gray-700">Content Item {moduleIndex + 1}</h6>
        <button
          type="button"
          onClick={removeContent}
          className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor={`content-type-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Content Type*
          </label>
          <div className="mt-1">
            <select
              id={`content-type-${moduleIndex}`}
              value={content.type}
              onChange={(e) => handleContentChange('type', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
        </div>
        
        <div className="sm:col-span-3">
          <label htmlFor={`content-duration-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <div className="mt-1">
            <input
              type="number"
              id={`content-duration-${moduleIndex}`}
              value={content.duration || ''}
              onChange={(e) => handleContentChange('duration', e.target.value)}
              min="0"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-6">
          <label htmlFor={`content-title-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Content Title*
          </label>
          <div className="mt-1">
            <input
              type="text"
              id={`content-title-${moduleIndex}`}
              required
              value={content.title}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-6">
          <label htmlFor={`content-description-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Content Description
          </label>
          <div className="mt-1">
            <textarea
              id={`content-description-${moduleIndex}`}
              rows={2}
              value={content.description || ''}
              onChange={(e) => handleContentChange('description', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-6">
          <label htmlFor={`content-url-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            {content.type === 'video' ? 'Video URL' : 
             content.type === 'document' ? 'Document URL' : 
             content.type === 'quiz' ? 'Quiz URL' : 'Assignment URL'}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id={`content-url-${moduleIndex}`}
              value={content.url || ''}
              onChange={(e) => handleContentChange('url', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        {content.type === 'document' && (
          <div className="sm:col-span-6">
            <div className="flex items-center">
              <input
                id={`content-downloadable-${moduleIndex}`}
                type="checkbox"
                checked={content.isDownloadable || false}
                onChange={(e) => handleContentChange('isDownloadable', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`content-downloadable-${moduleIndex}`} className="ml-2 block text-sm text-gray-700">
                Allow document download
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleContent;