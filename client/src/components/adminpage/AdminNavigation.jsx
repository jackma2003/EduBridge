import React from 'react';

const AdminNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl shadow-md mb-8">
      <nav className="flex">
        <button
          className={`py-4 px-6 flex-grow text-center rounded-tl-xl ${activeTab === 'teachers' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium' 
            : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('teachers')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Teacher Applications</span>
          </div>
        </button>
        <button
          className={`py-4 px-6 flex-grow text-center ${activeTab === 'users' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium' 
            : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Manage Users</span>
          </div>
        </button>
        <button
          className={`py-4 px-6 flex-grow text-center rounded-tr-xl ${activeTab === 'admins' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium' 
            : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('admins')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Create Admin</span>
          </div>
        </button>
      </nav>
    </div>
  );
};

export default AdminNavigation;