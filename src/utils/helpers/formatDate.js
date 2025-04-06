export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'Unknown';
  
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  try {
    return new Date(dateString).toLocaleDateString(
      undefined, 
      { ...defaultOptions, ...options }
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getYearFromDate = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).getFullYear();
  } catch (error) {
    return '';
  }
};