// src/services/doctorService.js
import api from './api';

export const doctorService = {
    getAllDoctors: async (params) => {
        return await api.get('/doctors', { params });
    },

    getDoctorById: async (id) => {
        return await api.get(`/doctors/${id}`);
    },

    createDoctor: async (data) => {
        return await api.post('/doctors', data);
    },

    updateDoctor: async (id, data) => {
        return await api.put(`/doctors/${id}`, data);
    },

    deleteDoctor: async (id) => {
        return await api.delete(`/doctors/${id}`);
    },

    getDoctorSchedule: async (id, params) => {
        return await api.get(`/doctors/${id}/schedule`, { params });
    },

    getDoctorsByDepartment: async (department) => {
        return await api.get('/doctors', { 
            params: { department } 
        });
    },

    getDepartments: async () => {
        return await api.get('/doctors/departments');
    },

    getDoctorStats: async (id, params) => {
        return await api.get(`/doctors/${id}/stats`, { params });
    },

    updateDoctorAvailability: async (id, data) => {
        return await api.put(`/doctors/${id}/availability`, data);
    },

    getDoctorPatients: async (id, params) => {
        return await api.get(`/doctors/${id}/patients`, { params });
    },

    getDoctorAppointments: async (id, params) => {
        return await api.get(`/doctors/${id}/appointments`, { params });
    },

    setDoctorLeave: async (id, data) => {
        return await api.post(`/doctors/${id}/leave`, data);
    }
};