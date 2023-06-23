import axios from 'axios';

// Create an instance of Axios with a base URL and common headers
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add an interceptor to handle 401 Unauthorized responses and redirect to the login page
axiosInstance.interceptors.response.use(null, (error) => {
  if (error.response?.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Export the axios instance so it can be used in other components of the app
export default axiosInstance;