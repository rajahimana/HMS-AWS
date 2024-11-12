// src/pages/Insurance/InsuranceVerification.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './styles/InsuranceVerification.module.css';
import { insuranceService } from './services/insuranceService';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const InsuranceVerification = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [formData, setFormData] = useState({
        policyNumber: '',
        patientId: '',
        insuranceProvider: '',
        serviceType: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setVerificationResult(null);

        try {
            setLoading(true);
            const response = await insuranceService.verifyInsurance(formData);
            setVerificationResult(response.data);
        } catch (err) {
            setError(err.message || 'Error verifying insurance');
        } finally {
            setLoading(false);
        }
    };

    const renderVerificationResult = () => {
        if (!verificationResult) return null;

        const { status, coverage } = verificationResult;

        return (
            <>
            <div className={styles.resultCard}>
                <div className={styles.statusHeader}>
                    {status === 'active' ? (
                        <div className={styles.statusActive}>
                            <CheckCircle size={24} />
                            <span>Coverage Active</span>
                        </div>
                    ) : status === 'expired' ? (
                        <div className={styles.statusExpired}>
                            <XCircle size={24} />
                            <span>Coverage Expired</span>
                        </div>
                    ) : (
                        <div className={styles.statusPending}>
                            <AlertTriangle size={24} />
                            <span>Verification Pending</span>
                        </div>
                    )}
                </div>

                {status === 'active' && (
                    <>
                        <div className={styles.coverageDetails}>
                            <div className={styles.detailRow}>
                                <span>Policy Holder</span>
                                <span>{coverage.policyHolder}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Coverage Type</span>
                                <span>{coverage.type}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Start Date</span>
                                <span>{new Date(coverage.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>End Date</span>
                                <span>{new Date(coverage.expirationDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {coverage.benefits && (
                            <div className={styles.benefits}>
                                <h3>Coverage Benefits</h3>
                                <ul>
                                    {Object.entries(coverage.benefits).map(([benefit, value]) => (
                                        <li key={benefit}>
                                            <span>{benefit}</span>
                                            <span>{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
        );
    };

    return (
        <><Header />
        <div className={styles.container}>
            <div className={styles.header}>
                <button 
                    className={styles.backButton}
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>
                <h1>Insurance Verification</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.content}>
                <form className={styles.verificationForm} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="policyNumber">Policy Number *</label>
                            <input
                                type="text"
                                id="policyNumber"
                                name="policyNumber"
                                value={formData.policyNumber}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    policyNumber: e.target.value
                                }))}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="insuranceProvider">Insurance Provider *</label>
                            <input
                                type="text"
                                id="insuranceProvider"
                                name="insuranceProvider"
                                value={formData.insuranceProvider}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    insuranceProvider: e.target.value
                                }))}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="patientId">Patient ID *</label>
                            <input
                                type="text"
                                id="patientId"
                                name="patientId"
                                value={formData.patientId}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    patientId: e.target.value
                                }))}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="serviceType">Service Type</label>
                            <select
                                id="serviceType"
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    serviceType: e.target.value
                                }))}
                            >
                                <option value="">Select Service Type</option>
                                <option value="consultation">Consultation</option>
                                <option value="procedure">Procedure</option>
                                <option value="surgery">Surgery</option>
                                <option value="diagnostic">Diagnostic</option>
                                <option value="emergency">Emergency</option>
                                <option value="preventive">Preventive Care</option>
                                <option value="dental">Dental</option>
                                <option value="vision">Vision</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.verifyButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles.loading}>Verifying...</span>
                        ) : (
                            <>
                                <Search size={20} />
                                Verify Insurance
                            </>
                        )}
                    </button>
                </form>

                {renderVerificationResult()}
            </div>
        </div>
                <Footer />
        </>
    );
};

export default InsuranceVerification;