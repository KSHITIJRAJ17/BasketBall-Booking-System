import React, { useState } from 'react';
import './NotificationButton.css'; // Import CSS for styling

const NotificationButton = () => {
    const [showNotification, setShowNotification] = useState(false);

    const toggleNotification = () => {
        setShowNotification(prevState => !prevState);
    };

    return (
        <div className="notification-container">
            <button className="notification-button" onClick={toggleNotification}>
                <span className="material-icons">notifications</span>
                <span className="notification-button__badge">3</span>
                {showNotification ? '' : ''}
            </button>
            {showNotification && (
                <div className="dropdown-content" id="notification-dropdown">
                  <a>Notififation 1</a>
                  <a>Notififation 2</a>
                  <a>Notififation 3</a>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
