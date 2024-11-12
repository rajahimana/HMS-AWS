// src/services/insuranceService.js
import api from './api';

export const insuranceService = {
    verifyInsurance: async (data) => {
        return await api.post('/insurance/verify', data);
    },

    getProviders: async () => {
        return await api.get('/insurance/providers');
    },

    submitClaim: async (data) => {
        return await api.post('/insurance/claims', data);
    },

    getClaimStatus: async (id) => {
        return await api.get(`/insurance/claims/${id}`);
    },

    getPatientCoverage: async (patientId) => {
        return await api.get(`/insurance/coverage/${patientId}`);
    },

    updateClaim: async (id, data) => {
        return await api.put(`/insurance/claims/${id}`, data);
    },

    getAllClaims: async (params) => {
        return await api.get('/insurance/claims', { params });
    },

    getClaimHistory: async (id) => {
        return await api.get(`/insurance/claims/${id}/history`);
    },

    getCoverageDetails: async (providerId, policyNumber) => {
        return await api.get('/insurance/coverage-details', {
            params: { providerId, policyNumber }
        });
    },

    validatePolicy: async (data) => {
        return await api.post('/insurance/validate-policy', data);
    },

    getPolicyBenefits: async (policyNumber) => {
        return await api.get(`/insurance/benefits/${policyNumber}`);
    },

    checkPreauthorization: async (data) => {
        return await api.post('/insurance/preauthorization', data);
    }
};