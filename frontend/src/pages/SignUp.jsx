import { useState ,useEffect } from 'react';
import styles from './Login.module.css';
import DeetsBtn from './../assets/loginPage/deetLogo.jpg';
import SideImg from './../assets/loginPage/sideImg.jpg';
import GoogleBtn from './../assets/loginPage/googleBtn.jpg';
import FacebookBtn from './../assets/loginPage/facebookBtn.jpg';
import DiscordBtn from './../assets/loginPage/discordBtn.jpg';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
// import API from '../app/API';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isVisible, setIsVissible] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [wallet, setWallet] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3001/login', { email, password, wallet})
            .then(result => {
                console.log(result)
                if(result.data){
                    navigate('/home', { state: { email } });
                }
            
        })
            .catch(err=> console.log(err))
        console.log(response.data);
    };

    const handleCheckboxChange = () => {
        setKeepSignedIn(!keepSignedIn);
    };

    const handleVisibility = () => {
        setIsVissible(!isVisible);
    };

    const handleSignUpClick = () => {
        window.location.href = '/signUp';
    };

    return (
        <div className={styles.login}>
            {/* <p>{message}</p> */}
            <img className={styles.logo} src={DeetsBtn} />
            <img className={styles.sideImg} src={SideImg} />
            <div className={styles.formDiv}>
                <p className={styles.divTxt}><b>Login to your account</b></p>
                <form onSubmit={handleLogin}>
                    <label>
                        <b>Your Email:</b><br /><br />
                        <div className={styles.inputContainer}>
                            <i className={`material-icons ${styles.mailIcon}`}>email</i>
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Your Email'
                            />
                        </div>
                    </label>
                    <br /><br />
                    <label>
                        <b>Password:</b><br /><br />
                        <div className={styles.inputContainer}>
                            <i className={`material-icons ${styles.mailIcon}`}>lock</i>
                            <input
                                type={isVisible ? 'text':'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                            />
                            <i className={isVisible ? `material-icons ${ styles.eyeIconS}` : `material-icons ${styles.eyeIcon}`} onClick={handleVisibility}>visibility_off</i>
                        </div>
                    </label>
                    <div style={{ display: 'flex', marginTop: '10%' }}>
                        <label className={styles.checkBoxLabel}>
                            <input
                                type="checkbox"
                                checked={keepSignedIn}
                                onChange={handleCheckboxChange}
                            />
                            Keep me signed in
                        </label>
                        <div style={{
                            fontFamily: 'sans-serif',
                            fontSize: 12,
                            fontWeight: 'bold',
                            position: 'absolute',
                            right: 0,
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Forgot Password?
                        </div>
                    </div>
                    <button type='submit' className={styles.formSubmit}>Login</button>
                </form>
                <center>
                    <p className={styles.orTxt}>Or, Continue with</p>
                </center>
                <center style={{
                    diaplay: 'flex',
                    marginTop: '5%'
                }}>
                    <button className={styles.imgBtn}>
                        <img className={styles.btnImg} src={GoogleBtn}></img>
                    </button>
                    <button className={styles.imgBtn}>
                        <img className={styles.btnImg} src={FacebookBtn}></img>
                    </button>
                    <button className={styles.imgBtn}>
                        <img className={styles.btnImg} src={DiscordBtn}></img>
                    </button>
                </center>
                <center>
                    <p className={styles.signupTxt}><a>Not registered yet?</a>  <u style={{cursor:'pointer'}} onClick={handleSignUpClick}>Try SignUp</u></p>
                </center>
            </div>
        </div>
    );
};
export default LoginPage;
