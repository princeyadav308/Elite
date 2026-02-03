// API Service
// Axios client for backend API calls

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: () => apiClient.post('/auth/logout'),
    getMe: () => apiClient.get('/auth/me'),
    updatePassword: (data) => apiClient.patch('/auth/update-password', data),
};

// Gym API
export const gymAPI = {
    getAll: () => apiClient.get('/gyms'),
    getById: (id) => apiClient.get(`/gyms/${id}`),
    create: (data) => apiClient.post('/gyms', data),
    update: (id, data) => apiClient.patch(`/gyms/${id}`, data),
    delete: (id) => apiClient.delete(`/gyms/${id}`),
    getStats: (id) => apiClient.get(`/gyms/${id}/stats`),
};

// Member API
export const memberAPI = {
    getAll: (params) => apiClient.get('/members', { params }),
    getById: (id) => apiClient.get(`/members/${id}`),
    create: (data) => apiClient.post('/members', data),
    update: (id, data) => apiClient.patch(`/members/${id}`, data),
    delete: (id) => apiClient.delete(`/members/${id}`),
    checkIn: (id) => apiClient.post(`/members/${id}/check-in`),
    checkOut: (id) => apiClient.post(`/members/${id}/check-out`),
    getHistory: (id) => apiClient.get(`/members/${id}/history`),
    getBadges: (id) => apiClient.get(`/members/${id}/badges`),
};

// User API
export const userAPI = {
    getAll: (params) => apiClient.get('/users', { params }),
    getById: (id) => apiClient.get(`/users/${id}`),
    create: (data) => apiClient.post('/users', data),
    update: (id, data) => apiClient.patch(`/users/${id}`, data),
    delete: (id) => apiClient.delete(`/users/${id}`),
};

export default apiClient;
