// src/pages/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, FileText, DollarSign } from 'lucide-react';
import styles from './styles/Dashboard.module.css';
import logo from './assets/mmlogo.png';

const Dashboard = () => {
   const navigate = useNavigate();
  const [appointments] = useState([
    { id: 1, date: '2024-11-10', doctor: 'Dr. Smith', status: 'Scheduled' },
    { id: 2, date: '2024-11-15', doctor: 'Dr. Johnson', status: 'Pending' }
  ]);

  // Quick action cards data
  const quickActions = [
    {
      title: 'Patients',
      subtitle: 'Register/View',
      icon: <UserCircle className={styles.icon} color="#3b82f6" />,
      path: '/patients'
    },
    {
      title: 'Appointments',
      subtitle: 'Schedule/Manage',
      icon: <Calendar className={styles.icon} color="#22c55e" />,
     path: '/appointments'
    },
    {
      title: 'Insurance',
      subtitle: 'Verify/Claims',
      icon: <FileText className={styles.icon} color="#a855f7" />,
     path: '/insurance'
    },
    {
      title: 'Billing',
      subtitle: 'Payments/History',
      icon: <DollarSign className={styles.icon} color="#eab308" />,
     path: '/billing'
    }
  ];

  //Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
          {/* Header Section */}
          <div className={styles.header}>
      <img src={logo} alt="MassMutual Logo" className={styles.logo} />
        <h1 className={styles.title}>Hospital Management System</h1>
      </div>
    <div className={styles.container}>


      {/* Quick Actions Grid */}
      <div className={styles.quickActions}>
        {quickActions.map((action, index) => (
          <div 
            key={index} 
            className={styles.card}
            onClick={() => handleNavigation(action.path)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.cardContent}>
              {action.icon}
              <div className={styles.cardText}>
                <h3>{action.title}</h3>
                <p>{action.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointments Section */}
      <div className={styles.appointmentsCard}>
        <div className={styles.appointmentsHeader}>
          <h2 className={styles.cardTitle}>Recent Appointments</h2>
          <button 
            className={styles.viewAllButton}
            onClick={() => navigate('/appointments')}
          >
            View All
          </button>
        </div>
        <div className={styles.appointmentsList}>
          {appointments.map(appointment => (
            <div 
              key={appointment.id} 
              className={styles.appointmentItem}
              onClick={() => navigate(`/appointments/${appointment.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.appointmentInfo}>
                <p className={styles.doctorName}>{appointment.doctor}</p>
                <p className={styles.appointmentDate}>{appointment.date}</p>
              </div>
              <span className={`${styles.status} ${
                appointment.status === 'Scheduled' 
                  ? styles.statusScheduled 
                  : styles.statusPending
              }`}>
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;