import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from './Components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [wallet, setWallet] = useState();

    const location = useLocation();
    const email = location.state && location.state.email;

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    const isOutsideTimeFrame = () => {
        const currentHour = new Date().getHours();
        return currentHour < 6 || currentHour >= 21;
    };

    const fetchBookingsByEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3001/fetchBookingsByEmail', { email });
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            // Handle error
        }
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

        fetchBookingsByEmail();

    }, []);


    return (
        <>
            <div className={styles.uploadFile}>
                <Header email={email} />


                <div className={styles.section}>
                    <div style={{ marginLeft: 20 }}>
                        <p>{email}</p>
                        <p>Wallet : {wallet}</p>
                        <p>{formattedDate}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Selected Date</th>
                                    <th>Selected Time</th>
                                    <th>Plot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{new Date(booking.selectedDate).toLocaleDateString()}</td>
                                        <td>{booking.selectedTime}</td>
                                        <td>{booking.plot}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                </div>
            </div>
            <div style={{ backgroundColor: 'lightgreen', position: 'fixed', bottom: 0, width: '100%', height: 10 }} />
        </>
    );
};

export default ViewBooking;