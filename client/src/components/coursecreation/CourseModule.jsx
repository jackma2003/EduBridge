import React from 'react';
import ModuleContent from './ModuleContent';

const CourseModule = ({ 
  moduleIndex, 
  module, 
  handleModuleChange, 
  removeModule, 
  handleContentChange, 
  addContent, 
  removeContent 
}) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">Module {moduleIndex + 1}</h4>
        <button
          type="button"
          onClick={removeModule}
          className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor={`module-title-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Module Title*
          </label>
          <div className="mt-1">
            <input
              type="text"
              id={`module-title-${moduleIndex}`}
              required
              value={module.title}
              onChange={(e) => handleModuleChange('title', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-6">
          <label htmlFor={`module-description-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
            Module Description
          </label>
          <div className="mt-1">
            <textarea
              id={`module-description-${moduleIndex}`}
              rows={2}
              value={module.description || ''}
              onChange={(e) => handleModuleChange('description', e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        {/* Module Content */}
        <div className="sm:col-span-6">
          <h5 className="font-medium text-gray-700 mb-2">Module Content</h5>
          
          <div className="space-y-4">
            {module.content.map((content, contentIndex) => (
              <ModuleContent
                key={contentIndex}
                moduleIndex={contentIndex}
                content={content}
                handleContentChange={(field, value) => handleContentChange(contentIndex, field, value)}
                removeContent={() => removeContent(contentIndex)}
              />
            ))}
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => addContent('video')}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Video
              </button>
              
              <button
                type="button"
                onClick={() => addContent('document')}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Document
              </button>
              
              <button
                type="button"
                onClick={() => addContent('quiz')}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Quiz
              </button>
              
              <button
                type="button"
                onClick={() => addContent('assignment')}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;