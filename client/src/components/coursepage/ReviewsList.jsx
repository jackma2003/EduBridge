import React, { useState } from 'react';

const ReviewsList = ({ ratings, formatDate }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Determine which reviews to display
  const displayedReviews = showAllReviews ? ratings : ratings.slice(0, 3);
  
  return (
    <div className="border-t border-gray-200 px-6 py-5">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Student Reviews</h2>
      
      <div className="space-y-4">
        {displayedReviews.map((rating, index) => (
          <div key={`${rating.student?._id || 'anonymous'}-${rating.createdAt}-${index}`} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`h-4 w-4 ${star <= rating.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-500">
                {formatDate(rating.createdAt)}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800">
              {rating.student?.name || 'Anonymous Student'}
            </p>
            {rating.review && (
              <p className="mt-1 text-sm text-gray-600">{rating.review}</p>
            )}
          </div>
        ))}
        
        {ratings.length > 3 && (
          <div className="text-center">
            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {showAllReviews ? 'Show fewer reviews' : `View all ${ratings.length} reviews`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;