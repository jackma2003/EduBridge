import React, { useState, useEffect } from 'react';
import { getLearningGoals, createLearningGoal, updateLearningGoal, deleteLearningGoal } from '../../services/api';

// A learning goals component that saves to MongoDB
const LearningGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load goals from the backend on initial render
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await getLearningGoals();
        setGoals(response.data.goals || []);
        setError('');
      } catch (err) {
        console.error('Error fetching learning goals:', err);
        setError('Failed to load your learning goals');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Toggle goal completion
  const toggleGoal = async (id) => {
    try {
      const goalToUpdate = goals.find(goal => goal._id === id);
      if (!goalToUpdate) return;

      // Optimistically update UI
      setGoals(goals.map(goal => 
        goal._id === id ? { ...goal, completed: !goal.completed } : goal
      ));

      // Update in backend
      await updateLearningGoal(id, { 
        ...goalToUpdate, 
        completed: !goalToUpdate.completed 
      });
    } catch (err) {
      console.error('Error updating goal:', err);
      // Revert optimistic update if backend call fails
      setGoals(prevGoals => [...prevGoals]);
      setError('Failed to update goal');
    }
  };

  // Add a new goal
  const addGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    
    try {
      // Create goal in backend
      const response = await createLearningGoal({ 
        text: newGoal, 
        completed: false 
      });
      
      // Update local state with new goal from backend (includes _id)
      setGoals([...goals, response.data.goal]);
      setNewGoal('');
      setError('');
    } catch (err) {
      console.error('Error adding goal:', err);
      setError('Failed to add goal');
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      // Optimistically update UI
      setGoals(goals.filter(goal => goal._id !== id));
      
      // Delete from backend
      await deleteLearningGoal(id);
      setError('');
    } catch (err) {
      console.error('Error deleting goal:', err);
      // Revert optimistic update if backend call fails
      setGoals(prevGoals => [...prevGoals]);
      setError('Failed to delete goal');
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    if (goals.length === 0) return 0;
    return Math.round((goals.filter(g => g.completed).length / goals.length) * 100);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Learning Goals
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Track your personal learning goals and stay on target
        </p>
      </div>
      
      <div className="p-4">
        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* Goal input form */}
        <form onSubmit={addGoal} className="mb-4 flex">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new learning goal..."
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
        
        {/* Loading state */}
        {loading ? (
          <div className="py-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Goals list */}
            {goals.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>You haven't added any learning goals yet.</p>
                <p className="text-sm mt-2">Add your first goal using the form above!</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {goals.map(goal => (
                  <li key={goal._id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className={`ml-3 text-sm ${goal.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {goal.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          
            {/* Summary - only show if there are goals */}
            {goals.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Completed: {goals.filter(g => g.completed).length}/{goals.length}</span>
                  <span>{calculateCompletion()}% complete</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${calculateCompletion()}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LearningGoals;