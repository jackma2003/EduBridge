import React from 'react';

const CourseBasicInfo = ({ formData, handleInputChange, handleLanguageChange }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Course Information
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Course Title*
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Write a detailed description of your course.
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Level*
            </label>
            <div className="mt-1">
              <select
                id="level"
                name="level"
                required
                value={formData.level}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Languages
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="en"
                  name="language"
                  type="checkbox"
                  value="en"
                  checked={formData.languages.includes('en')}
                  onChange={handleLanguageChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="en" className="ml-2 block text-sm text-gray-700">
                  English
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="es"
                  name="language"
                  type="checkbox"
                  value="es"
                  checked={formData.languages.includes('es')}
                  onChange={handleLanguageChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="es" className="ml-2 block text-sm text-gray-700">
                  Spanish
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="fr"
                  name="language"
                  type="checkbox"
                  value="fr"
                  checked={formData.languages.includes('fr')}
                  onChange={handleLanguageChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fr" className="ml-2 block text-sm text-gray-700">
                  French
                </label>
              </div>
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isPublished"
                  name="isPublished"
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'isPublished',
                      value: e.target.checked
                    }
                  })}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isPublished" className="font-medium text-gray-700">Publish immediately</label>
                <p className="text-gray-500">If unchecked, the course will be saved as a draft.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;