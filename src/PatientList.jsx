// src/pages/Patients/PatientList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search } from 'lucide-react';
import styles from './styles/PatientList.module.css';
import { patientService } from './services/patientService';

const PatientList = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await patientService.getAllPatients();
            setPatients(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Error fetching patients');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await patientService.getAllPatients({ search: searchTerm });
            setPatients(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Error searching patients');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await patientService.deletePatient(id);
                await fetchPatients(); // Refresh list
            } catch (err) {
                setError(err.message || 'Error deleting patient');
            }
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading patients...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Patient Management</h1>
                <button 
                    className={styles.addButton}
                    onClick={() => navigate('/patients/register')}
                >
                    <UserPlus size={20} />
                    Add New Patient
                </button>
            </div>

            <div className={styles.searchBox}>
                <Search className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>

            <div className={styles.patientList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Insurance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.patientId}>
                                <td>{`${patient.firstName} ${patient.lastName}`}</td>
                                <td>{patient.age}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.insuranceInfo?.provider}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button 
                                            className={styles.viewButton}
                                            onClick={() => navigate(`/patients/${patient.patientId}`)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className={styles.editButton}
                                            onClick={() => navigate(`/patients/edit/${patient.patientId}`)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(patient.patientId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;