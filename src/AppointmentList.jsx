// src/pages/Appointments/AppointmentList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Filter, ArrowLeft } from 'lucide-react';
import styles from './styles/AppointmentList.module.css';
import Header from './Header';
import Footer from './Footer';

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Vikranth Singh',
      doctor: 'Dr. Alekhya',
      date: '2024-11-10',
      time: '10:00 AM',
      status: 'Scheduled',
      type: 'General Checkup'
    },
    {
      id: 2,
      patientName: 'Kareena Singh',
      doctor: 'Dr. Vishnu',
      date: '2024-11-10',
      time: '11:30 AM',
      status: 'Completed',
      type: 'Follow-up'
    },
    // Add more mock data
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
        <div className={styles.titleSection}>
          <h1>Appointments</h1>
          <button 
            className={styles.addButton}
            onClick={() => navigate('/appointments/book')}
          >
            <Plus size={20} />
            Book Appointment
          </button>
        </div>
        
        <div className={styles.filterSection}>
          <div className={styles.dateFilter}>
            <Calendar size={20} />
            <input type="date" />
          </div>
          <button className={styles.filterButton}>
            <Filter size={20} />
            Filter
          </button>
        </div>
      </div>

      <div className={styles.appointmentList}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.type}</td>
                <td>
                  <span className={`${styles.status} ${styles[appointment.status.toLowerCase()]}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.cancelButton}>Cancel</button>
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

export default AppointmentList;