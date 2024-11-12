// src/services/patientService.js
import api from './api';

export const patientService = {
    getAllPatients: async (params) => {
        return await api.get('/patients', { params });
    },

    getPatientById: async (id) => {
        return await api.get(`/patients/${id}`);
    },

    createPatient: async (data) => {
        return await api.post('/patients', data);
    },

    updatePatient: async (id, data) => {
        return await api.put(`/patients/${id}`, data);
    },

    deletePatient: async (id) => {
        return await api.delete(`/patients/${id}`);
    }
};