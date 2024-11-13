import React, { useState } from 'react';
import QRimg from './assets/mm-app-qr.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // To navigate to another page on successful login

    // Handle input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle login submission
    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        // fetch('http://localhost:8080/api/login', {  // Replace with your actual backend login endpoint
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(loginData),
        // })
        // .then(response => response.json())
        // .then(data => {
            if (email=="sunshine" && password=="sunshine") {
                // Handle successful login
                console.log('Login successful');
                navigate('/Mainpage');  // Redirect to dashboard or any other page after successful login
            } else {
                // Handle login failure
                setError('Invalid email or password. Please try again.');
            }
    //     })
    //     .catch(error => {
    //         console.error('Error during login:', error);
    //         setError('An error occurred during login. Please try again later.');
    //     });
     };

    return (
        <div className={styles.appContainer}>
                            <Header />
            <div className={styles.scrollableContent}>
                <h3 className={styles.titletext}>Log in to Dashboard</h3>
                <div className={styles.container}>
                    <div className={styles.LoginCard}>
                        <label>Email</label><br />
                        <input 
                            type="text" 
                            id="InputEmail" 
                            placeholder="Email" 
                            value={email}
                            onChange={handleEmailChange} 
                        /><br />

                        <label>Password</label><br />
                        <input 
                            type="password" 
                            id="InputPass" 
                            placeholder="Password" 
                            value={password}
                            onChange={handlePasswordChange} 
                        /><br />

                        <a href="#">Forgot Password?</a>

                        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
                        
                        <button onClick={handleLogin}>Log in</button>
                        <p className={styles.textBelow}>
                            Don't have an account? <Link to="/Mainpage">Sign up</Link>
                        </p>
                    </div>
                </div>
                <div className={styles.AppWindow}>
                    <h4>
                        Discover the MassMutual App
                        <img src={QRimg} alt="QR code" className={styles.qrimg} />
                    </h4>
                    <p>The easiest way to manage your policies, make payments, view statements, and more.</p>
                    <p>Scan QR code to Download!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
