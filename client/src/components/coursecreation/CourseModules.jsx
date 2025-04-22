import React from 'react';
import CourseModule from './CourseModule';

const CourseModules = ({ 
  modules, 
  handleModuleChange, 
  addModule, 
  removeModule, 
  handleContentChange, 
  addContent, 
  removeContent 
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Course Modules
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add modules to organize your course content. Each module can contain videos, documents, quizzes, and assignments.
        </p>
        
        <div className="mt-6 space-y-6">
          {modules.map((module, moduleIndex) => (
            <CourseModule
              key={moduleIndex}
              moduleIndex={moduleIndex}
              module={module}
              handleModuleChange={(field, value) => handleModuleChange(moduleIndex, field, value)}
              removeModule={() => removeModule(moduleIndex)}
              handleContentChange={(contentIndex, field, value) => 
                handleContentChange(moduleIndex, contentIndex, field, value)}
              addContent={(contentType) => addContent(moduleIndex, contentType)}
              removeContent={(contentIndex) => removeContent(moduleIndex, contentIndex)}
            />
          ))}
          
          <button
            type="button"
            onClick={addModule}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-0.5 mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModules;