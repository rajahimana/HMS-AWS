import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
        <p>&copy; 2024 MassMutual Insurance. All rights reserved.</p>
        <span>Terms and Conditions | Privacy Policy</span>
        </footer>
    );
};

export default Footer