export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };