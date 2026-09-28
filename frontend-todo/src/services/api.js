import axios from 'axios';

const rawUrl = (import.meta.env.VITE_API_URL || 'https://todo-app-e6rf.onrender.com/api').trim();
const normalizedUrl = rawUrl.replace(/\/+$/, '');
const baseURL = normalizedUrl.endsWith('/api') ? normalizedUrl : `${normalizedUrl}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('teen_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
