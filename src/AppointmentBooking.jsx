// src/pages/Appointments/AppointmentBooking.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import styles from './styles/AppointmentBooking.module.css';
import { appointmentService } from './services/appointmentService';
import { patientService } from './services/patientService';
import { doctorService } from './services/doctorService';
import Header from './Header';
import Footer from './Footer';

const AppointmentBooking = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [patients, setPatients] = useState([]);

    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: '',
        department: '',
        notes: ''
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [patientsRes, departmentsRes] = await Promise.all([
                patientService.getAllPatients(),
                doctorService.getDepartments()
            ]);
            setPatients(patientsRes.data);
            setDepartments(departmentsRes.data);
        } catch (err) {
            setError('Error loading initial data');
        } finally {
            setLoading(false);
        }
    };

    const handleDepartmentChange = async (e) => {
        const department = e.target.value;
        setFormData(prev => ({ ...prev, department, doctorId: '' }));
        try {
            const response = await doctorService.getDoctorsByDepartment(department);
            setDoctors(response.data);
        } catch (err) {
            setError('Error loading doctors');
        }
    };

    const handleDateChange = async (e) => {
        const date = e.target.value;
        setFormData(prev => ({ ...prev, appointmentDate: date, appointmentTime: '' }));
        if (formData.doctorId && date) {
            try {
                const response = await appointmentService.getAvailableSlots(
                    formData.doctorId, 
                    date
                );
                setAvailableSlots(response.data);
            } catch (err) {
                setError('Error loading available slots');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
            setError('Please fill all required fields');
            return;
        }

        try {
            setLoading(true);
            await appointmentService.createAppointment(formData);
            navigate('/appointments');
        } catch (err) {
            setError(err.message || 'Error booking appointment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <><Header/>
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

            {error && <div className={styles.error}>{error}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="patientId">Patient *</label>
                        <select
                            id="patientId"
                            name="patientId"
                            value={formData.patientId}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                patientId: e.target.value
                            }))}
                            required
                        >
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient.patientId} value={patient.patientId}>
                                    {`${patient.firstName} ${patient.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="department">Department *</label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleDepartmentChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="doctorId">Doctor *</label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                doctorId: e.target.value
                            }))}
                            required
                            disabled={!formData.department}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.doctorId} value={doctor.doctorId}>
                                    {`Dr. ${doctor.firstName} ${doctor.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="appointmentType">Appointment Type *</label>
                        <select
                            id="appointmentType"
                            name="appointmentType"
                            value={formData.appointmentType}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                appointmentType: e.target.value
                            }))}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="consultation">Consultation</option>
                            <option value="followup">Follow-up</option>
                            <option value="checkup">General Checkup</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="appointmentDate">Date *</label>
                        <div className={styles.dateInput}>
                            <Calendar size={20} />
                            <input
                                type="date"
                                id="appointmentDate"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleDateChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Available Time Slots *</label>
                        <div className={styles.timeSlots}>
                            {availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    className={`${styles.timeSlot} ${
                                        formData.appointmentTime === slot ? styles.selected : ''
                                    }`}
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        appointmentTime: slot
                                    }))}
                                >
                                    <Clock size={16} />
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                notes: e.target.value
                            }))}
                            rows={4}
                        />
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button 
                        type="button" 
                        className={styles.cancelButton}
                        onClick={() => navigate('/appointments')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </div>
            </form>
        </div>
        <Footer/></>
    );
};

export default AppointmentBooking;