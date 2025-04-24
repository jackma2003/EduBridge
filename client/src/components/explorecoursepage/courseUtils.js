// Helper functions for course-related functionality

/**
 * Generates a background color gradient based on the course title
 * @param {string} title - The course title
 * @returns {string} - A Tailwind CSS gradient class
 */
export const generateBgColor = (title) => {
    const colors = [
      'from-blue-500 to-indigo-700',
      'from-purple-500 to-pink-600',
      'from-green-500 to-teal-600',
      'from-orange-400 to-red-600',
      'from-cyan-500 to-blue-600'
    ];
    
    // Simple hash function to pick a color consistently
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
/**
 * Gets initials from a name for avatar display
 * @param {string} name - The full name to extract initials from
 * @returns {string} - The initials (up to 2 characters)
 */
export const getInitials = (name) => {
if (!name) return "IN";
return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Renders a star rating component based on a numerical rating
 * @param {number|string} rating - The rating value (0-5)
 * @returns {JSX.Element} - A star rating display component
 */
export const renderStarRating = (rating) => {
const ratingValue = parseFloat(rating) || 0;
const stars = [];

for (let i = 1; i <= 5; i++) {
    stars.push(
    <svg 
        key={i}
        className={`h-4 w-4 ${i <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    );
}

return (
    <div className="flex items-center">
    <div className="flex mr-1">{stars}</div>
    <span>{rating || '0.0'}</span>
    </div>
);
};