import React from 'react';

const CourseTopics = ({ topics, handleTopicChange, addTopic, removeTopic }) => {
  return (
    <div className="sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">
        Topics*
      </label>
      <p className="mt-1 text-sm text-gray-500">
        Add topics relevant to your course (at least one is required).
      </p>
      <div className="mt-2 space-y-3">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder={`Topic ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeTopic(index)}
              disabled={topics.length === 1}
              className={`ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${topics.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTopic}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Topic
        </button>
      </div>
    </div>
  );
};

export default CourseTopics;