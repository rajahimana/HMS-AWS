import React from 'react';
import styles from './styles/Mainpage.module.css';
import { Link } from 'react-router-dom';
import patients from './assets/patients.jpg';
import appointments from './assets/appointments.jpg';
import billing from './assets/billing.avif';
import insurance from './assets/insurance.jpg';
import Header from './Header';

const Mainpage = () => {
  return (
    <>
    <Header />
    <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img src={patients} alt="Patients" className={styles.cardImage} />
          <h3>Patients</h3>
          <p>Register/View</p>
          <Link to="/patients">
            <button className={styles.learnMore}>Choose</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={appointments}  alt="Appointments" className={styles.cardImage} />
          <h3>Appointments</h3>
          <p>Schedule/Manage</p>
          <Link to="/appointments">
            <button className={styles.learnMore}>Choose</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={insurance}  alt="Insurance" className={styles.cardImage} />
          <h3>Insurance</h3>
          <p>Verify/Claims</p>
          <Link to="/insurance">
            <button className={styles.learnMore}>Choose</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={billing}  alt="Billing" className={styles.cardImage} />
          <h3>Billing</h3>
          <p>Payments/History</p>
          <Link to="/billing">
            <button className={styles.learnMore}>Choose</button>
          </Link>
        </div>
    </div>
    <footer className={styles.footer}>
            <p>&copy; 2024 MassMutual Insurance. All rights reserved.</p>
            <span>Terms and Conditions | Privacy Policy</span>
        </footer>
    </>
  );
};

export default Mainpage;