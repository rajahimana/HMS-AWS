// src/pages/Patients/PatientList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search,ArrowLeft } from 'lucide-react';
import styles from './styles/PatientList.module.css';
import Header from './Header';
import Footer from './Footer';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    { id: 1, name: 'Vaishnavi Reddy', age: 35, phone: '123-456-7890', insurance: 'Gold Plan' },
    { id: 2, name: 'Santosh Kumar', age: 28, phone: '098-765-4321', insurance: 'Premium Plan' },
    // Add more mock data as needed
  ]);

  return (
    <><Header />
    <div className={styles.container}>
    <button 
          className={styles.backButton}
          onClick={() => navigate('/Mainpage')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
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
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.phone}</td>
                <td>{patient.insurance}</td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      View
                    </button>
                    <button className={styles.editButton}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        <Footer/>
    </>
  );
};

export default PatientList;