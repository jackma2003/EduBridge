import React, { useState, useEffect } from 'react';
import { getStudySessions, createStudySession, updateStudySession, deleteStudySession } from '../../services/api';

// A weekly study calendar/planner component that saves to MongoDB
const StudyCalendar = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Initialize with empty sessions for each day
  const emptySessionsState = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };
  
  // State variables
  const [studySessions, setStudySessions] = useState(emptySessionsState);
  const [newSession, setNewSession] = useState({
    day: 'Monday',
    subject: '',
    time: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load study sessions from backend on initial render
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await getStudySessions();
        
        // Transform the flat list into a grouped object by day
        // Create a new empty state to avoid mixing with existing data
        const groupedSessions = { ...emptySessionsState };
        
        // Get the actual array of sessions from the response
        // The API returns data in format { status: 'success', sessions: [...] }
        const sessionsData = response.data.sessions || [];
        
        // Process each session and add it to the appropriate day's array
        sessionsData.forEach(session => {
          if (daysOfWeek.includes(session.day)) {
            // Check if session already exists in the array based on _id
            const existingSessionIndex = groupedSessions[session.day].findIndex(s => s._id === session._id);
            
            // Only add the session if it doesn't already exist
            if (existingSessionIndex === -1) {
              groupedSessions[session.day].push(session);
            }
          }
        });
        
        // Replace the entire state with our newly constructed object
        setStudySessions(groupedSessions);
        setError('');
      } catch (err) {
        console.error('Error fetching study sessions:', err);
        setError('Failed to load your study sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);
  
  // Toggle session completion
  const toggleCompletion = async (day, sessionId) => {
    try {
      const sessionToUpdate = studySessions[day].find(session => session._id === sessionId);
      if (!sessionToUpdate) return;

      // Optimistically update UI
      setStudySessions({
        ...studySessions,
        [day]: studySessions[day].map(session => 
          session._id === sessionId 
            ? { ...session, completed: !session.completed } 
            : session
        )
      });

      // Update in backend
      await updateStudySession(sessionId, {
        ...sessionToUpdate,
        completed: !sessionToUpdate.completed
      });
      setError('');
    } catch (err) {
      console.error('Error updating session:', err);
      // Revert optimistic update if backend call fails
      setStudySessions(prevSessions => ({ ...prevSessions }));
      setError('Failed to update session');
    }
  };
  
  // Add new study session
  const addSession = async (e) => {
    e.preventDefault();
    
    if (!newSession.subject.trim() || !newSession.time.trim()) return;
    
    try {
      // Create session in backend
      const response = await createStudySession({
        day: newSession.day,
        subject: newSession.subject,
        time: newSession.time,
        completed: false
      });
      
      // Update local state with new session from backend (includes _id)
      // The API returns data in format { status: 'success', session: {...} }
      const newSessionFromBackend = response.data.session;
      
      // Check if this session already exists before adding
      if (newSessionFromBackend && newSessionFromBackend._id) {
        // Only add if it doesn't already exist in our local state
        const sessionExists = studySessions[newSession.day].some(
          session => session._id === newSessionFromBackend._id
        );
        
        if (!sessionExists) {
          setStudySessions({
            ...studySessions,
            [newSession.day]: [
              ...studySessions[newSession.day],
              newSessionFromBackend
            ]
          });
        }
      }
      
      // Reset form
      setNewSession({
        day: 'Monday',
        subject: '',
        time: ''
      });
      setShowForm(false);
      setError('');
    } catch (err) {
      console.error('Error adding session:', err);
      setError('Failed to add study session');
    }
  };
  
  // Delete a study session
  const deleteSession = async (day, sessionId) => {
    try {
      // Optimistically update UI
      setStudySessions({
        ...studySessions,
        [day]: studySessions[day].filter(session => session._id !== sessionId)
      });
      
      // Delete from backend
      await deleteStudySession(sessionId);
      setError('');
    } catch (err) {
      console.error('Error deleting session:', err);
      // Revert optimistic update if backend call fails
      setStudySessions(prevSessions => ({ ...prevSessions }));
      setError('Failed to delete session');
    }
  };
  
  // Calculate overall progress
  const calculateProgress = () => {
    const allSessions = Object.values(studySessions).flat();
    const completedCount = allSessions.filter(session => session.completed).length;
    
    return allSessions.length > 0 
      ? Math.round((completedCount / allSessions.length) * 100) 
      : 0;
  };

  // Count total sessions
  const getTotalSessionsCount = () => {
    return Object.values(studySessions).flat().length;
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Weekly Study Planner
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Organize your study sessions for the week
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showForm ? 'Cancel' : 'Add Session'}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="p-4">
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        </div>
      )}
      
      {/* Add new session form */}
      {showForm && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <form onSubmit={addSession} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
                <select
                  id="day"
                  value={newSession.day}
                  onChange={(e) => setNewSession({...newSession, day: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                  placeholder="What will you study?"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="text"
                  id="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  placeholder="e.g. 09:00 - 10:30"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add to Calendar
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Empty state */}
          {getTotalSessionsCount() === 0 && !showForm && (
            <div className="p-8 text-center text-gray-500">
              <p>You haven't planned any study sessions yet.</p>
              <p className="text-sm mt-2">Click "Add Session" to start planning your week!</p>
            </div>
          )}
          
          {/* Calendar view - only show if there are sessions */}
          {getTotalSessionsCount() > 0 && (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {daysOfWeek.map(day => (
                          <th 
                            key={day} 
                            scope="col" 
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        {daysOfWeek.map(day => (
                          <td key={day} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                            {studySessions[day].length > 0 ? (
                              <ul className="space-y-2">
                                {studySessions[day].map(session => (
                                  <li key={session._id} className="bg-gray-50 p-2 rounded">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={session.completed}
                                          onChange={() => toggleCompletion(day, session._id)}
                                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <div className="ml-2">
                                          <p className={`text-sm font-medium ${session.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                            {session.subject}
                                          </p>
                                          <p className="text-xs text-gray-500">{session.time}</p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => deleteSession(day, session._id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No sessions</p>
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Progress summary - only show if there are sessions */}
          {getTotalSessionsCount() > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress this week</span>
                <span>{calculateProgress()}% complete</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudyCalendar;