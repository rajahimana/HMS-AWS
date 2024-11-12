import { Italic } from 'lucide-react';
import styles from './Header.module.css';
import logo from './assets/mmlogo.png';  // Import your logo image

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt="MassMutual Logo" className={styles.logo} />  {/* Logo Image */}
            <h5>Welcome, <em>Sunshine Hospitals</em></h5>
        </header>
    );
};

export default Header;