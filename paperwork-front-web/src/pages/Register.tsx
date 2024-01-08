import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';
import FooterNoConnected from '../components/Footer';

import "../styles/pages/Register.scss";

function RegisterPage() {
    const api = process.env.REACT_APP_BASE_URL;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const cookies = new Cookies();
    const { t } = useTranslation();

    async function handleSubmit(event: any) {
        event.preventDefault();
        await axios.post(`${api}/user/register`,
            {
                username: username,
                email: email,
                password: password
            }
        ).then(async response => {
            cookies.set('loginToken', { loginToken: response.data.jwt }, {
                path: '/',
                secure: true,
                sameSite: 'none'
            });
            window.location.replace('/home');
        }).catch((err) => {
            console.error(err);
            toast.error(t('register.error'));
        })
    };

    function handleConfirmPasswordChange(event: any) {
        const confirm = event.target.value;
        setConfirmPassword(confirm);
    };

    async function googleConnect() {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/user/oauth/google/urlLogin`)
            .then(res => {
                window.location.assign(res.data);
            }).catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (email && password && confirmPassword === password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
        if (cookies.get('loginToken')) {
            window.location.replace('/home');
        }
    });

    return (
        <>
            <Navbar />
            <div className="Register">
                <div className='Register-container'>
                    <div className='Register-wrapper'>
                        <h1 className='Register-title'>{t('register.title')}</h1>
                        <form className='Register-form' onSubmit={handleSubmit}>
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
                            <button className={buttonDisabled ? 'Register-submit-button disabled' : 'Register-submit-button'} type='submit' aria-label='button-register' disabled={buttonDisabled}>
                                {t('register.button')}
                            </button>
                        </form>
                        <div className='Register-connections'>
                            <button className='Register-button-api' data-testid="google-link" onClick={googleConnect}>
                                <FaGoogle />
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
                </div>
            </div>
            <FooterNoConnected />
        </>
    );
}

export default RegisterPage;