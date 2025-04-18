import React from 'react';

const RatingForm = ({
  userRating,
  setUserRating,
  userReview,
  setUserReview,
  handleRatingSubmit,
  setShowRatingForm,
  submittingRating,
  ratingError
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {userRating > 0 ? 'Edit Your Rating' : 'Rate This Course'}
      </h2>
      
      {ratingError && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{ratingError}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleRatingSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setUserRating(star)}
                className="focus:outline-none"
              >
                <svg 
                  className={`h-8 w-8 ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {userRating === 1 && "Poor"}
              {userRating === 2 && "Fair"}
              {userRating === 3 && "Good"}
              {userRating === 4 && "Very Good"}
              {userRating === 5 && "Excellent"}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Write your thoughts about this course..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowRatingForm(false)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submittingRating}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              submittingRating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {submittingRating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit Rating'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RatingForm;