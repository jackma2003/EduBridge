import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../services/api';

const CourseCreationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Course form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: 'default-course.jpg',
    languages: ['en'],
    level: 'beginner',
    topics: [''],
    isPublished: false
  });
  
  // Module state
  const [modules, setModules] = useState([
    {
      title: '',
      description: '',
      content: [
        {
          type: 'video',
          title: '',
          description: '',
          url: '',
          duration: 0,
          isDownloadable: false
        }
      ]
    }
  ]);

  // Check if user is logged in and is a teacher
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'teacher') {
      navigate('/login');
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle language selection
  const handleLanguageChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData({
        ...formData,
        languages: [...formData.languages, value]
      });
    } else {
      setFormData({
        ...formData,
        languages: formData.languages.filter(lang => lang !== value)
      });
    }
  };
  
  // Handle topics changes
  const handleTopicChange = (index, value) => {
    const updatedTopics = [...formData.topics];
    updatedTopics[index] = value;
    setFormData({
      ...formData,
      topics: updatedTopics
    });
  };
  
  // Add a new topic field
  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, '']
    });
  };
  
  // Remove a topic field
  const removeTopic = (index) => {
    const updatedTopics = [...formData.topics];
    updatedTopics.splice(index, 1);
    setFormData({
      ...formData,
      topics: updatedTopics
    });
  };
  
  // Handle module changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };
  
  // Add a new module
  const addModule = () => {
    setModules([
      ...modules,
      {
        title: '',
        description: '',
        content: [
          {
            type: 'video',
            title: '',
            description: '',
            url: '',
            duration: 0,
            isDownloadable: false
          }
        ]
      }
    ]);
  };
  
  // Remove a module
  const removeModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };
  
  // Handle module content changes
  const handleContentChange = (moduleIndex, contentIndex, field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].content[contentIndex][field] = value;
    setModules(updatedModules);
  };
  
  // Add content to a module
  const addContent = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].content.push({
      type: 'video',
      title: '',
      description: '',
      url: '',
      duration: 0,
      isDownloadable: false
    });
    setModules(updatedModules);
  };
  
  // Remove content from a module
  const removeContent = (moduleIndex, contentIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].content.splice(contentIndex, 1);
    setModules(updatedModules);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate topics (remove empty ones)
      const filteredTopics = formData.topics.filter(topic => topic.trim() !== '');
      if (filteredTopics.length === 0) {
        throw new Error('At least one topic is required');
      }
      
      // Validate modules
      if (modules.some(module => !module.title.trim())) {
        throw new Error('All modules must have a title');
      }
      
      // Prepare form data with modules
      const courseData = {
        ...formData,
        topics: filteredTopics,
        modules: modules
      };
      
      // Submit the form
      const response = await createCourse(courseData);
      
      setSuccess(true);
      
      // Redirect to the course page after a short delay
      setTimeout(() => {
        navigate(`/courses/${response.data.course._id}`);
      }, 1500);
      
    } catch (err) {
      console.error('Error creating course:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Create New Course
            </h2>
          </div>
          <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => navigate('/teacher')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Course created successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Course Information */}
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
                  <label className="block text-sm font-medium text-gray-700">
                    Topics*
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Add topics relevant to your course (at least one is required).
                  </p>
                  <div className="mt-2 space-y-3">
                    {formData.topics.map((topic, index) => (
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
                          disabled={formData.topics.length === 1}
                          className={`ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${formData.topics.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isPublished"
                        name="isPublished"
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
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
          
          {/* Course Modules */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Course Modules
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add modules to organize your course content.
              </p>
              
              <div className="mt-6 space-y-6">
                {modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium text-gray-900">Module {moduleIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeModule(moduleIndex)}
                        disabled={modules.length === 1}
                        className={`inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${modules.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
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
                            value={module.description}
                            onChange={(e) => handleModuleChange(moduleIndex, 'description', e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      {/* Module Content */}
                      <div className="sm:col-span-6">
                        <h5 className="font-medium text-gray-700 mb-2">Module Content</h5>
                        
                        <div className="space-y-4">
                          {module.content.map((content, contentIndex) => (
                            <div key={contentIndex} className="border border-gray-200 rounded-md p-3 bg-white">
                              <div className="flex items-center justify-between mb-3">
                                <h6 className="text-sm font-medium text-gray-700">Content {contentIndex + 1}</h6>
                                <button
                                  type="button"
                                  onClick={() => removeContent(moduleIndex, contentIndex)}
                                  disabled={module.content.length === 1}
                                  className={`inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${module.content.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label htmlFor={`content-type-${moduleIndex}-${contentIndex}`} className="block text-sm font-medium text-gray-700">
                                    Content Type*
                                  </label>
                                  <div className="mt-1">
                                    <select
                                      id={`content-type-${moduleIndex}-${contentIndex}`}
                                      required
                                      value={content.type}
                                      onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'type', e.target.value)}
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
                                  <label htmlFor={`content-title-${moduleIndex}-${contentIndex}`} className="block text-sm font-medium text-gray-700">
                                    Content Title*
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      id={`content-title-${moduleIndex}-${contentIndex}`}
                                      required
                                      value={content.title}
                                      onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'title', e.target.value)}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                                
                                <div className="sm:col-span-6">
                                  <label htmlFor={`content-description-${moduleIndex}-${contentIndex}`} className="block text-sm font-medium text-gray-700">
                                    Content Description
                                  </label>
                                  <div className="mt-1">
                                    <textarea
                                      id={`content-description-${moduleIndex}-${contentIndex}`}
                                      rows={2}
                                      value={content.description}
                                      onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'description', e.target.value)}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                                
                                <div className="sm:col-span-4">
                                  <label htmlFor={`content-url-${moduleIndex}-${contentIndex}`} className="block text-sm font-medium text-gray-700">
                                    URL {content.type === 'video' || content.type === 'document' ? '*' : ''}
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      id={`content-url-${moduleIndex}-${contentIndex}`}
                                      required={content.type === 'video' || content.type === 'document'}
                                      value={content.url}
                                      onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'url', e.target.value)}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                      placeholder={content.type === 'video' ? 'YouTube or video URL' : content.type === 'document' ? 'Document URL' : ''}
                                    />
                                  </div>
                                </div>
                                
                                {content.type === 'video' && (
                                  <div className="sm:col-span-2">
                                    <label htmlFor={`content-duration-${moduleIndex}-${contentIndex}`} className="block text-sm font-medium text-gray-700">
                                      Duration (minutes)
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="number"
                                        id={`content-duration-${moduleIndex}-${contentIndex}`}
                                        min="0"
                                        value={content.duration}
                                        onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'duration', parseInt(e.target.value) || 0)}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                {(content.type === 'video' || content.type === 'document') && (
                                  <div className="sm:col-span-6">
                                    <div className="flex items-start">
                                      <div className="flex items-center h-5">
                                        <input
                                          id={`content-downloadable-${moduleIndex}-${contentIndex}`}
                                          type="checkbox"
                                          checked={content.isDownloadable}
                                          onChange={(e) => handleContentChange(moduleIndex, contentIndex, 'isDownloadable', e.target.checked)}
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                      </div>
                                      <div className="ml-3 text-sm">
                                        <label htmlFor={`content-downloadable-${moduleIndex}-${contentIndex}`} className="font-medium text-gray-700">
                                          Downloadable
                                        </label>
                                        <p className="text-gray-500">Allow students to download this content.</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => addContent(moduleIndex)}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Content
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
          
          {/* Submit buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/teacher')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreationForm;