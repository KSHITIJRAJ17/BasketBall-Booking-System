import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from './Components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [activeButton, setActiveButton] = useState('Excel');
    const [plot, setPlot] = useState('');
    const [wallet, setWallet] = useState()

    const location = useLocation();
    const email = location.state && location.state.email;

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    const handleSectionButton = (buttonName) => {
        setActiveButton(buttonName);
        setPlot(buttonName);
    };


    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/booking', { email, selectedDate, selectedTime, plot })
            .then(result => {
                console.log(result);
                // Redirect to home page after successful registration
                alert('Booking Successful');
                // window.location.href = '/';
            })
            .catch(err => {
                // Handle registration errors
                console.error('Error registering user:', err);
                // Optionally display an alert or message to the user
                alert('An error occurred during registration. Please try again.');
            });
        console.log('Email: ', email);
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
        console.log('Plot: ', plot);
    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];

    const isOutsideTimeFrame = () => {
        const currentHour = new Date().getHours();
        return currentHour < 6 || currentHour >= 21;
    };

    useEffect(() => {
        if (isOutsideTimeFrame()) {
            alert('Please note: The website is only available between 6am and 9pm.');
        }
        axios.post('http://localhost:3001/fetchWallet', { email })
            .then(result => {
                console.log(result);
                // Redirect to home page after successful registration
                setWallet(result.data.wallet);
                // window.location.href = '/';
            })
            .catch(err => {
                // Handle registration errors
                console.error('Error registering user:', err);
                // Optionally display an alert or message to the user
                
            });

    }, []);


    return (
        <>
            <div className={styles.uploadFile}>
            <Header email={email} />

                <div className={styles.sectionGroup}>
                    <button
                        className={`${styles.sectionBtn} ${activeButton === 'Plot1' && styles.sectionBtnActive}`}
                        onClick={() => handleSectionButton('Plot1')}>
                        Plot 1
                    </button>
                    <button
                        className={`${styles.sectionBtn} ${activeButton === 'Plot2' && styles.sectionBtnActive}`}
                        onClick={() => handleSectionButton('Plot2')}>
                        Plot2
                    </button>
                </div>
                <div className={styles.section}>
                    <div style={{marginLeft: 20}}>
                    <p>{email}</p>
                    <p>Wallet : {wallet}</p>
                    <p>{formattedDate}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select Date:
                            <input type="date" min={new Date().toISOString().split('T')[0]} max={maxDateString} value={selectedDate} onChange={handleDateChange} />
                        </label>
                        <br />
                        <label>
                            Select Time:
                            <input type="time" value={selectedTime} step="3600" onChange={handleTimeChange} />
                        </label>
                        <br />
                        
                        <center>
                            <button type='submit' className={styles.secSubmitBtn} onClick={handleSubmit}>Submit</button>
                        </center>
                    </form>
                    </div>


                </div>
            </div>
            <div style={{ backgroundColor: 'lightgreen', position: 'fixed', bottom: 0, width: '100%', height: 10 }} />
        </>
    );
};

export default Home;

