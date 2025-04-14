import { useRouter } from 'next/router';

export const logout = async () => {
  // Clear localStorage items
  localStorage.removeItem('chatbot_state');
  // Add any other localStorage items that need to be cleared
  
  // Call logout API endpoint
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  
  // Return true to indicate successful logout
  return true;
};