import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllUsers, 
  getPendingTeachers, 
  approveTeacher, 
  rejectTeacher, 
  registerAdmin 
} from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teachers');
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New admin form state
  const [adminForm, setAdminForm] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });
  const [adminFormError, setAdminFormError] = useState('');
  const [adminFormSuccess, setAdminFormSuccess] = useState('');

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Fetch initial data
    fetchPendingTeachers();
    fetchUsers();
  }, [navigate]);

  const fetchPendingTeachers = async () => {
    try {
      setLoading(true);
      const response = await getPendingTeachers();
      setPendingTeachers(response.data.data);
    } catch (err) {
      setError('Failed to load pending teacher applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherAction = async (id, action, reason = '') => {
    try {
      setLoading(true);
      
      if (action === 'approve') {
        await approveTeacher(id);
      } else if (action === 'reject') {
        await rejectTeacher(id, reason);
      }
      
      // Refresh the list
      fetchPendingTeachers();
      
    } catch (err) {
      setError(`Failed to ${action} teacher application`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminFormChange = (e) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();
    setAdminFormError('');
    setAdminFormSuccess('');
    
    try {
      setLoading(true);
      await registerAdmin(adminForm);
      
      setAdminFormSuccess('Admin created successfully!');
      setAdminForm({
        username: '',
        email: '',
        password: '',
        name: ''
      });
      
      // Refresh user list
      fetchUsers();
      
    } catch (err) {
      setAdminFormError(err.response?.data?.message || 'Failed to create admin');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">EduBridge Admin Dashboard</h1>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Back to Site
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 border-b">
          <nav className="flex space-x-4">
            <button
              className={`py-2 px-4 ${activeTab === 'teachers' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('teachers')}
            >
              Teacher Applications
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('users')}
            >
              Manage Users
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'admins' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('admins')}
            >
              Create Admin
            </button>
          </nav>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Teacher Applications Tab */}
        {activeTab === 'teachers' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Teacher Applications</h2>
            
            {loading ? (
              <div className="text-center py-4">Loading applications...</div>
            ) : pendingTeachers.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No pending teacher applications at this time.</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingTeachers.map((teacher) => (
                      <tr key={teacher._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{teacher.user.username}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.institution}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(teacher.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleTeacherAction(teacher._id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for rejection:');
                                if (reason) handleTeacherAction(teacher._id, 'reject', reason);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => {
                                // View details - ideally in a modal/popup
                                alert(`Expertise: ${teacher.expertise}\n\nBiography: ${teacher.biography}`);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            
            {loading ? (
              <div className="text-center py-4">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No users found.</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{user.username}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'teacher' ? 'bg-blue-100 text-blue-800' : 
                                'bg-green-100 text-green-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isVerified ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                            {user.role !== 'admin' && (
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Create Admin Tab */}
        {activeTab === 'admins' && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Creating an admin account grants full access to all platform features and user data. Use this with caution.
                  </p>
                </div>
              </div>
            </div>
            
            {adminFormError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {adminFormError}
              </div>
            )}
            
            {adminFormSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {adminFormSuccess}
              </div>
            )}
            
            <form onSubmit={handleAdminFormSubmit} className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={adminForm.name}
                  onChange={handleAdminFormChange}
                  placeholder="Enter admin's full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username *
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  value={adminForm.username}
                  onChange={handleAdminFormChange}
                  placeholder="Choose a username"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={adminForm.email}
                  onChange={handleAdminFormChange}
                  placeholder="Enter admin's email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password *
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={adminForm.password}
                  onChange={handleAdminFormChange}
                  placeholder="Create a password"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating Admin...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;