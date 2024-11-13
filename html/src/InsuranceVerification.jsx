// src/pages/Insurance/InsuranceVerification.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, CheckCircle, XCircle } from 'lucide-react';
import styles from './styles/InsuranceVerification.module.css';
import Header from './Header';
import Footer from './Footer';

const InsuranceVerification = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    policyNumber: '',
    insuranceProvider: '',
    patientId: ''
  });

  const [verificationResult, setVerificationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // Mock verification result
    setVerificationResult({
      status: 'active',
      policyHolder: 'Ananya Rao',
      coverageType: 'Full Coverage',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      deductible: '$1,000',
      copay: '$25',
      coverageDetails: [
        'Primary Care Visits',
        'Specialist Visits',
        'Hospital Stays',
        'Emergency Services',
        'Prescription Drugs'
      ]
    });
  };

  return (
    <><Header />
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/Mainpage')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Insurance Verification</h1>
      </div>

      <div className={styles.content}>
        <form className={styles.searchForm} onSubmit={handleVerify}>
          <div className={styles.searchGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="policyNumber">Policy Number</label>
              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                value={searchData.policyNumber}
                onChange={handleChange}
                placeholder="Enter policy number"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="insuranceProvider">Insurance Provider</label>
              <select
                id="insuranceProvider"
                name="insuranceProvider"
                value={searchData.insuranceProvider}
                onChange={handleChange}
                required
              >
                <option value="">Select Provider</option>
                <option value="blueCross">Blue Cross</option>
                <option value="aetna">Aetna</option>
                <option value="cigna">Cigna</option>
                <option value="unitedHealth">United Health</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={searchData.patientId}
                onChange={handleChange}
                placeholder="Enter patient ID"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.verifyButton}>
            <Search size={20} />
            Verify Insurance
          </button>
        </form>

        {verificationResult && (
          <div className={styles.resultCard}>
            <div className={styles.statusHeader}>
              {verificationResult.status === 'active' ? (
                <div className={styles.statusActive}>
                  <CheckCircle size={24} />
                  <span>Coverage Active</span>
                </div>
              ) : (
                <div className={styles.statusInactive}>
                  <XCircle size={24} />
                  <span>Coverage Inactive</span>
                </div>
              )}
            </div>

            <div className={styles.resultGrid}>
              <div className={styles.resultItem}>
                <label>Policy Holder</label>
                <span>{verificationResult.policyHolder}</span>
              </div>

              <div className={styles.resultItem}>
                <label>Coverage Type</label>
                <span>{verificationResult.coverageType}</span>
              </div>

              <div className={styles.resultItem}>
                <label>Start Date</label>
                <span>{verificationResult.startDate}</span>
              </div>

              <div className={styles.resultItem}>
                <label>End Date</label>
                <span>{verificationResult.endDate}</span>
              </div>

              <div className={styles.resultItem}>
                <label>Deductible</label>
                <span>{verificationResult.deductible}</span>
              </div>

              <div className={styles.resultItem}>
                <label>Copay</label>
                <span>{verificationResult.copay}</span>
              </div>
            </div>

            <div className={styles.coverageDetails}>
              <h3>Coverage Details</h3>
              <ul>
                {verificationResult.coverageDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default InsuranceVerification;