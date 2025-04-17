import React, { useState, useEffect } from 'react';
import { getPendingTeachers, approveTeacher, rejectTeacher } from '../../services/api';
import TeacherDetailsModal from './TeacherDetailsModal';
import LoadingSpinner from './LoadingSpinner';

const TeacherApplications = ({ loading, setLoading, setError }) => {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    fetchPendingTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPendingTeachers = async () => {
    try {
      setLoading(true);
      const response = await getPendingTeachers();
      // Adjust based on your API response structure
      setPendingTeachers(response.data.data || response.data);
    } catch (err) {
      setError('Failed to load pending teacher applications');
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Teacher Applications</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {pendingTeachers.length} Pending
        </span>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : pendingTeachers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 text-lg">No pending teacher applications at this time.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingTeachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full h-10 w-10 flex items-center justify-center">
                          {teacher.user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{teacher.user.name}</div>
                          <div className="text-sm text-gray-500">{teacher.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{teacher.title}</div>
                      <div className="text-sm text-gray-500">{teacher.institution}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending Review
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowDetails(teacher)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button
                          onClick={() => handleTeacherAction(teacher._id, 'approve')}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('Reason for rejection:');
                            if (reason) handleTeacherAction(teacher._id, 'reject', reason);
                          }}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Teacher details modal */}
      {showDetails && (
        <TeacherDetailsModal 
          teacher={showDetails} 
          onClose={() => setShowDetails(null)} 
          handleTeacherAction={handleTeacherAction}
        />
      )}
    </div>
  );
};

export default TeacherApplications;