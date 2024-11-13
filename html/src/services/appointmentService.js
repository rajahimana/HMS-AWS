// src/services/appointmentService.js
import api from './api';

export const appointmentService = {
    getAllAppointments: async (params) => {
        return await api.get('/appointments', { params });
    },

    getAppointmentById: async (id) => {
        return await api.get(`/appointments/${id}`);
    },

    createAppointment: async (data) => {
        return await api.post('/appointments', data);
    },

    updateAppointment: async (id, data) => {
        return await api.put(`/appointments/${id}`, data);
    },

    cancelAppointment: async (id) => {
        return await api.delete(`/appointments/${id}`);
    },

    getAvailableSlots: async (doctorId, date) => {
        return await api.get(`/appointments/slots/${doctorId}`, { params: { date } });
    },

    getDoctorAppointments: async (doctorId, params) => {
        return await api.get(`/appointments/doctor/${doctorId}`, { params });
    }
};