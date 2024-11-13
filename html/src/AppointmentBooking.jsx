// src/pages/Appointments/AppointmentBooking.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './styles/AppointmentBooking.module.css';
import Header from './Header';
import Footer from './Footer';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
    appointmentType: '',
    description: ''
  });

  const departments = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'General Medicine'
  ];

  const doctors = {
    Cardiology: ['Dr. Alekhya', 'Dr. Suresh'],
    Dermatology: ['Dr. Madhu', 'Dr. Vishnu'],
    Neurology: ['Dr. Ashlesha', 'Dr. Keerthi'],
    Orthopedics: ['Dr. Varalakshmi', 'Dr. Vijay'],
    'General Medicine': ['Dr. Karthik', 'Dr. Nirmala']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset doctor when department changes
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        doctor: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Appointment booked:', formData);
    navigate('/appointments');
  };

  return (
    <><Header />
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/appointments')}
        >
          <ArrowLeft size={20} />
          Back to Appointments
        </button>
        <h1>Book New Appointment</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="patientId">Patient ID</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="doctor">Doctor</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              disabled={!formData.department}
            >
              <option value="">Select Doctor</option>
              {formData.department && 
                doctors[formData.department].map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="appointmentType">Appointment Type</label>
            <select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="consultation">Consultation</option>
              <option value="followup">Follow-up</option>
              <option value="checkup">General Checkup</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description/Symptoms</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/appointments')}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Book Appointment
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default AppointmentBooking;