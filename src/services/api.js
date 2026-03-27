import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginApi = (data) => api.post('/auth/login', data);
export const registerApi = (data) => api.post('/auth/register', data);

// Student
export const submitComplaintApi = (data) =>
  api.post('/complaints', data);
export const getMyComplaintsApi = () =>
  api.get('/complaints/my');
export const getMyStatsApi = () =>
  api.get('/complaints/stats');
export const getComplaintByIdApi = (id) =>
  api.get(`/complaints/${id}`);

// Admin
export const getAllComplaintsApi = (params) =>
  api.get('/admin/complaints', { params });
export const getAdminStatsApi = () =>
  api.get('/admin/stats');
export const getAdminComplaintByIdApi = (id) =>
  api.get(`/admin/complaints/${id}`);
export const updateComplaintStatusApi = (id, status) =>
  api.patch(`/admin/complaints/${id}/status`, null, {
    params: { status }
  });

export default api;