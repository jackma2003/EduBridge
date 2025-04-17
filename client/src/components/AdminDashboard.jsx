import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './adminpage/AdminHeader';
import AdminNavigation from './adminpage/AdminNavigation';
import TeacherApplications from './adminpage/TeacherApplications';
import UserManagement from './adminpage/UserManagement';
import CreateAdmin from './adminpage/CreateAdmin';
import ErrorMessage from './adminpage/ErrorMessage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teachers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is admin and get user info
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <AdminHeader navigate={navigate} user={currentUser} />

      <div className="container mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <AdminNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Error message */}
        {error && <ErrorMessage message={error} />}

        {/* Content area with card style */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Teacher Applications Tab */}
          {activeTab === 'teachers' && (
            <TeacherApplications
              setLoading={setLoading}
              loading={loading}
              setError={setError}
            />
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <UserManagement
              setLoading={setLoading}
              loading={loading}
              setError={setError}
            />
          )}

          {/* Create Admin Tab */}
          {activeTab === 'admins' && (
            <CreateAdmin
              setLoading={setLoading}
              loading={loading}
              setError={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;