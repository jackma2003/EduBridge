import React from 'react';

const TeacherDetailsModal = ({ teacher, onClose, handleTeacherAction }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Teacher Application Details</h3>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              {teacher.user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-semibold">{teacher.user.name}</h4>
              <p className="text-gray-500">@{teacher.user.username}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Contact</h5>
              <p className="text-gray-800">{teacher.user.email}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Professional Title</h5>
              <p className="text-gray-800">{teacher.title}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Institution</h5>
              <p className="text-gray-800">{teacher.institution}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Applied On</h5>
              <p className="text-gray-800">{new Date(teacher.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Areas of Expertise</h5>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800">{teacher.expertise}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h5 className="text-sm font-medium text-gray-500 uppercase mb-2">Biography</h5>
            <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
              <p className="text-gray-800">{teacher.biography}</p>
            </div>
          </div>
          
          <div className="flex space-x-3 justify-end mt-6">
            <button
              onClick={() => {
                const reason = prompt('Reason for rejection:');
                if (reason) {
                  handleTeacherAction(teacher._id, 'reject', reason);
                  onClose();
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-colors"
            >
              Reject Application
            </button>
            <button
              onClick={() => {
                handleTeacherAction(teacher._id, 'approve');
                onClose();
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Approve Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsModal;