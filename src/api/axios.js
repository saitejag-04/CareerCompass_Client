import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // fallback if env missing
  
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
