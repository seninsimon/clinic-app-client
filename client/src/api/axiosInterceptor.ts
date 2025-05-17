import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/', // your backend URL
  withCredentials: true, // VERY IMPORTANT to include cookies
});

// Optional: Global response interceptor for auth
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login or show message
      console.error('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
