import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, getCourse, updateCourse } from '../services/api';

// Import components
import CourseBasicInfo from './coursecreation/CourseBasicInfo';
import CourseTopics from './coursecreation/CourseTopics';
import CourseModules from './coursecreation/CourseModules';

const CourseCreationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get course ID from URL if in edit mode
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode); // Loading state for fetching course data
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

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchCourseData = async () => {
        try {
          setInitialLoading(true);
          const response = await getCourse(id);
          const course = response.data.course;
          
          // Check if the logged-in user is the course instructor
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (course.instructor._id !== user.id && user.role !== 'admin') {
            setError('You are not authorized to edit this course');
            navigate('/teacher');
            return;
          }
          
          // Populate form data
          setFormData({
            title: course.title,
            description: course.description,
            coverImage: course.coverImage || 'default-course.jpg',
            languages: course.languages || ['en'],
            level: course.level,
            topics: course.topics || [''],
            isPublished: course.isPublished
          });
          
          // Populate modules data
          if (course.modules && course.modules.length > 0) {
            setModules(course.modules);
          }
          
        } catch (err) {
          console.error('Error fetching course:', err);
          setError('Failed to load course data. Please try again.');
          navigate('/teacher');
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchCourseData();
    }
  }, [id, isEditMode, navigate]);

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
    
    // Convert duration to number if the field is duration
    if (field === 'duration') {
      value = value === '' ? 0 : Number(value);
    }
    
    updatedModules[moduleIndex].content[contentIndex][field] = value;
    setModules(updatedModules);
  };
  
  // Add content to a module
  const addContent = (moduleIndex, contentType = 'video') => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].content.push({
      type: contentType,
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
      
      // Validate content items
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        
        // Check if module has at least one content item
        if (!module.content || module.content.length === 0) {
          throw new Error(`Module ${i + 1} (${module.title}) must have at least one content item`);
        }
        
        // Check content items
        for (let j = 0; j < module.content.length; j++) {
          const content = module.content[j];
          
          if (!content.title.trim()) {
            throw new Error(`Content item ${j + 1} in Module ${i + 1} (${module.title}) must have a title`);
          }
          
          // Ensure duration is a number
          if (typeof content.duration !== 'number') {
            content.duration = Number(content.duration) || 0;
          }
        }
      }
      
      // Prepare form data with modules
      const courseData = {
        ...formData,
        topics: filteredTopics,
        modules: modules
      };
      
      let response;
      
      // Submit the form based on mode (create or edit)
      if (isEditMode) {
        response = await updateCourse(id, courseData);
        setSuccess(true);
        setTimeout(() => {
          navigate(`/courses/${id}`);
        }, 1500);
      } else {
        response = await createCourse(courseData);
        setSuccess(true);
        setTimeout(() => {
          navigate(`/courses/${response.data.course._id}`);
        }, 1500);
      }
      
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} course:`, err);
      setError(err.response?.data?.message || err.message || `Failed to ${isEditMode ? 'update' : 'create'} course`);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching course data in edit mode
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {isEditMode ? 'Edit Course' : 'Create New Course'}
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
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Course')}
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
                  Course {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Course Information */}
          <CourseBasicInfo 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleLanguageChange={handleLanguageChange} 
          />
          
          {/* Course Topics */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
            <CourseTopics 
              topics={formData.topics}
              handleTopicChange={handleTopicChange}
              addTopic={addTopic}
              removeTopic={removeTopic}
            />
          </div>
          
          {/* Course Modules */}
          <CourseModules 
            modules={modules}
            handleModuleChange={handleModuleChange}
            addModule={addModule}
            removeModule={removeModule}
            handleContentChange={handleContentChange}
            addContent={addContent}
            removeContent={removeContent}
          />
          
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
                  {isEditMode ? 'Saving...' : 'Creating...'}
                </>
              ) : (isEditMode ? 'Save Changes' : 'Create Course')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreationForm;