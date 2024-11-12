// src/pages/Patients/PatientRegistration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './styles/PatientRegistration.module.css';
import { patientService } from './services/patientService';

const PatientRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        },
        insuranceInfo: {
            provider: '',
            policyNumber: '',
            groupNumber: '',
            policyHolder: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.firstName) errors.push('First name is required');
        if (!formData.lastName) errors.push('Last name is required');
        if (!formData.email) errors.push('Email is required');
        if (!formData.phone) errors.push('Phone is required');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.push('Invalid email format');
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            errors.push('Invalid phone number format');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        try {
            setLoading(true);
            await patientService.createPatient(formData);
            navigate('/patients');
        } catch (err) {
            setError(err.message || 'Error registering patient');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button 
                    className={styles.backButton}
                    onClick={() => navigate('/patients')}
                >
                    <ArrowLeft size={20} />
                    Back to Patients
                </button>
                <h1>New Patient Registration</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    {/* Personal Information */}
                    <div className={styles.section}>
                        <h2>Personal Information</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="dateOfBirth">Date of Birth *</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.section}>
                        <h2>Contact Information</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address.street">Street Address</label>
                            <input
                                type="text"
                                id="address.street"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address.city">City</label>
                            <input
                                type="text"
                                id="address.city"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address.state">State</label>
                            <input
                                type="text"
                                id="address.state"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address.zipCode">ZIP Code</label>
                            <input
                                type="text"
                                id="address.zipCode"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Insurance Information */}
                    <div className={styles.section}>
                        <h2>Insurance Information</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="insuranceInfo.provider">Insurance Provider</label>
                            <input
                                type="text"
                                id="insuranceInfo.provider"
                                name="insuranceInfo.provider"
                                value={formData.insuranceInfo.provider}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="insuranceInfo.policyNumber">Policy Number</label>
                            <input
                                type="text"
                                id="insuranceInfo.policyNumber"
                                name="insuranceInfo.policyNumber"
                                value={formData.insuranceInfo.policyNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="insuranceInfo.groupNumber">Group Number</label>
                            <input
                                type="text"
                                id="insuranceInfo.groupNumber"
                                name="insuranceInfo.groupNumber"
                                value={formData.insuranceInfo.groupNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="insuranceInfo.policyHolder">Policy Holder</label>
                            <input
                                type="text"
                                id="insuranceInfo.policyHolder"
                                name="insuranceInfo.policyHolder"
                                value={formData.insuranceInfo.policyHolder}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className={styles.section}>
                        <h2>Emergency Contact</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="emergencyContact.name">Contact Name</label>
                            <input
                                type="text"
                                id="emergencyContact.name"
                                name="emergencyContact.name"
                                value={formData.emergencyContact.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="emergencyContact.relationship">Relationship</label>
                            <input
                                type="text"
                                id="emergencyContact.relationship"
                                name="emergencyContact.relationship"
                                value={formData.emergencyContact.relationship}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="emergencyContact.phone">Contact Phone</label>
                            <input
                                type="tel"
                                id="emergencyContact.phone"
                                name="emergencyContact.phone"
                                value={formData.emergencyContact.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button 
                        type="button" 
                        className={styles.cancelButton}
                        onClick={() => navigate('/patients')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register Patient'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientRegistration;