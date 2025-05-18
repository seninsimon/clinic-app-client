import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/',
  withCredentials: true, // Keep this true for cookie-based refresh tokens
});

// ✅ Request interceptor: Attach Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - logging out...');

      localStorage.removeItem('accessToken');

      window.location.href = '/login'; 
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
