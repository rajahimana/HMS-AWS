// src/services/index.js
export { default as api } from './api';
export { patientService } from './patientService';
export { appointmentService } from './appointmentService';
export { doctorService } from './doctorService';
export { insuranceService } from './insuranceService';
export { billingService } from './billingService';

// Error handling utility
export const handleApiError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status;
    const data = error.response?.data;

    return {
        message,
        status,
        data
    };
};

// Date formatting utility for consistent API requests
export const formatDateForApi = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
};

// Common request headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
};