import axios from 'axios';

// export const API_BASE_URL = "https://synora-backend-rhi7.onrender.com";
export const API_BASE_URL = "https://synora-backend-rhi7.onrender.com";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eventlink_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('eventlink_token');
        localStorage.removeItem('eventlink_user');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('Forbidden access');
      }
    } else if (error.request) {
      console.error('Network Error: ', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
