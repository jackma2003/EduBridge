/**
 * UI Helper functions for components
 */

/**
 * Gets initials from a name for avatar display
 * @param {string} name - The full name to extract initials from
 * @returns {string} - The initials (up to 2 characters)
 */
export const getInitials = (name) => {
    if (!name) return "UI";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  /**
   * Generates a consistent gradient background color based on a string
   * @param {string} title - The string to use for generating the color
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
    for (let i = 0; i < (title || '').length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };