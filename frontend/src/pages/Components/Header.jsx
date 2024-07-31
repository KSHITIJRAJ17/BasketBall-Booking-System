import React, { useState } from 'react';
import styles from './Header.module.css';
import DeetsLogo from './../../assets/Header/deetLogo.jpg';
import NotificationButton from './NotificationButton';
import Profile from './../../assets/Header/profile.jpg';
import {useNavigate} from 'react-router-dom';

const Header = ({ email }) => {
    const [activeButton, setActiveButton] = useState('Null');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const [showLogout, setShowLogout] = useState(false);

    const toggleLogout = () => {
        setShowLogout(prevState => !prevState);
    };

    const handleButtonClick = (buttonName) => {
        if (activeButton == buttonName) {
            setActiveButton('Null');
        }
        else {
            setActiveButton(buttonName);

        }

    };
    const handleNotificationClick = () => {
        console.log('Notification button clicked');
    };


    return (
        <>
            <div className={styles.header}>
                <img className={styles.logo} src={DeetsLogo} />
                <div className={styles.navGroup}>
                    <button
                        className={`${styles.navBtn} ${activeButton === 'Home' && styles.navBtnActive}`}
                        onClick={() => navigate('/home', { state: { email } })}
                    >
                        Home
                    </button>
                    <button
                        className={`${styles.navBtn} ${activeButton === 'Files' && styles.navBtnActive}`}
                        onClick={() => navigate('/viewBooking', { state: { email } })}
                    >
                        View Bookings
                    </button>
                    
                </div>
                <div className={styles.navSearch} >
                    <div className={styles.inputContainer}>
                        <i className={`material-icons ${styles.searchIcon}`}>search</i>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search'
                            style={{ background: 'transparent', borderWidth: 0, width: '100%' }}
                        />
                    </div>
                </div>
                <NotificationButton onClick={handleNotificationClick} />
                <button className={styles.profileBtn} onClick={toggleLogout}><img src={Profile} className={styles.profileImg} /></button>
            </div>
            {showLogout && (
                <div className={styles.dropdownContent}>
                  <a onClick={() => navigate('/')}>Logout</a>
                </div>
            )}
        </>
    );
};

export default Header;