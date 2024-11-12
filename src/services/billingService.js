// src/services/billingService.js
import api from './api';

export const billingService = {
    // Invoice Management
    getAllInvoices: async (params) => {
        return await api.get('/billing/invoices', { params });
    },

    getInvoiceById: async (id) => {
        return await api.get(`/billing/invoices/${id}`);
    },

    createInvoice: async (data) => {
        return await api.post('/billing/invoices', data);
    },

    updateInvoice: async (id, data) => {
        return await api.put(`/billing/invoices/${id}`, data);
    },

    deleteInvoice: async (id) => {
        return await api.delete(`/billing/invoices/${id}`);
    },

    // Payment Processing
    processPayment: async (data) => {
        return await api.post('/billing/payments', data);
    },

    getPaymentById: async (id) => {
        return await api.get(`/billing/payments/${id}`);
    },

    getAllPayments: async (params) => {
        return await api.get('/billing/payments', { params });
    },

    refundPayment: async (paymentId, data) => {
        return await api.post(`/billing/payments/${paymentId}/refund`, data);
    },

    // Patient Billing
    getPatientBilling: async (patientId, params) => {
        return await api.get(`/billing/patients/${patientId}`, { params });
    },

    getPatientInvoices: async (patientId, params) => {
        return await api.get(`/billing/patients/${patientId}/invoices`, { params });
    },

    getPatientPayments: async (patientId, params) => {
        return await api.get(`/billing/patients/${patientId}/payments`, { params });
    },

    // Billing Reports
    getBillingStats: async (params) => {
        return await api.get('/billing/stats', { params });
    },

    getRevenueReport: async (params) => {
        return await api.get('/billing/reports/revenue', { params });
    },

    getPaymentReport: async (params) => {
        return await api.get('/billing/reports/payments', { params });
    },

    getOutstandingBalances: async (params) => {
        return await api.get('/billing/reports/outstanding', { params });
    },

    // Document Generation
    generateInvoicePDF: async (invoiceId) => {
        return await api.get(`/billing/invoices/${invoiceId}/pdf`, {
            responseType: 'blob'
        });
    },

    generateReceiptPDF: async (paymentId) => {
        return await api.get(`/billing/payments/${paymentId}/receipt`, {
            responseType: 'blob'
        });
    },

    // Insurance Billing
    submitInsuranceClaim: async (data) => {
        return await api.post('/billing/insurance-claims', data);
    },

    getInsuranceClaimStatus: async (claimId) => {
        return await api.get(`/billing/insurance-claims/${claimId}`);
    },

    // Additional Utilities
    validatePaymentDetails: async (data) => {
        return await api.post('/billing/validate-payment', data);
    },

    getBillingStatements: async (params) => {
        return await api.get('/billing/statements', { params });
    },

    downloadBillingStatement: async (statementId) => {
        return await api.get(`/billing/statements/${statementId}/download`, {
            responseType: 'blob'
        });
    }
};