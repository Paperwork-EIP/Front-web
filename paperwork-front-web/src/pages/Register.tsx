import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';

import "../styles/pages/Register.scss";

const RegisterPage = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const cookies = new Cookies();
    const { t } = useTranslation();

    async function handleSubmit() {
        await axios.post(`${api}/user/register`,
            {
                username: username,
                email: email,
                password: password
            }
        ).then(async response => {
            await axios.get(`${api}/user/sendVerificationEmail?token=${response.data.jwt}`)
                .then(() => {
                    window.location.replace('/emailSent');
                })
                .catch(err => {
                    toast.error(t('register.fail'));
                    console.log(err);
                })
        }).catch((err) => {
            toast.error(t('register.error'));
            console.log(err);
            return;
        })
    };

    function handleConfirmPasswordChange(event: any) {
        const confirm = event.target.value;
        setConfirmPassword(confirm);

        if (password !== confirm) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    };

    function googleConnect() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/urlLogin`)
            .then(res => {
                window.location.replace(res.data)
            }).catch(err => {
                console.error(err);
            });
    }

    function facebookConnect() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`)
            .then(res => {
                window.location.replace(res.data)
            }).catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (cookies.get('loginToken')) {
            window.location.replace('/home');
        }
    });

    return (
        <div className="Register">
            <Navbar />
            <div className='Register-container'>
                <div className='Register-container-right'>
                    <h1 className='Register-title'>{t('register.title')}</h1>
                    <div className='Register-form'>
                        <div className="Register-form-group field">
                            <input type="email" className="Register-form-field" placeholder="Email" name="email" id='email' data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email" className="Register-form-label">{t('register.email')}</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="text" className="Register-form-field" placeholder="Username" name="username" id='username' data-testid="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="username" className="Register-form-label">{t('register.username')}</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="password" className="Register-form-field" placeholder="Password" name="password" id='password' data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="password" className="Register-form-label">{t('register.password')}</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="password" className="Register-form-field" placeholder="Confirm password" name="confirmPassword" id='confirmPassword' data-testid="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <label htmlFor="confirmPassword" className="Register-form-label">{t('register.confirm_password')}</label>
                        </div>
                        <button className={buttonDisabled ? 'Register-submit-button disabled' : 'Register-submit-button'} aria-label='button-register' onClick={() => { handleSubmit() }} disabled={buttonDisabled}>
                            {t('register.button')}
                        </button>
                    </div>
                    <div className='Register-connections'>
                        <button className='Register-button-api' data-testid="google-link" onClick={googleConnect}>
                            <FaGoogle />
                        </button>
                        <button className='Register-button-api' data-testid="facebook-link" onClick={facebookConnect}>
                            <FaFacebook />
                        </button>
                    </div>
                    <div className='Register-redirection-to-login'>
                        <span>
                        {t('register.yes_account')}
                        </span>
                        <span className='Register-link'>
                            <Link to='/login' data-testid="link-login">{t('register.yes_account_click')}</Link>
                        </span>
                    </div>
                </div>
                <div className='Register-container-left'>
                    <img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0" alt="background-Register-screen" />
                    <div className='Register-on-image-text'>
                        <h1>{t('register.text_1')}</h1>
                        <h3>{t('register.text_2')}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;