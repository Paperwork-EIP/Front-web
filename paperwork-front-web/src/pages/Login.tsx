import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";

import { FaGoogle } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useDisclosure } from '@chakra-ui/react';
import Modal from 'react-modal';

import Navbar from '../components/Navbar';
import FooterNoConnected from '../components/Footer';

import "../styles/pages/Login.scss";

function LoginPage() {
    const api = process.env.REACT_APP_BASE_URL;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

    const cookies = new Cookies();
    const { t } = useTranslation();

    async function handleSubmit(event: any) {
        event.preventDefault();
        await axios.post(
            `${api}/user/login`,
            {
                email: email,
                password: password
            }
        ).then(response => {
            cookies.set('loginToken', { loginToken: response.data.jwt, email: email }, {
                path: '/',
                secure: true,
                sameSite: 'none'
            });
            window.location.replace('/home');
        }).catch(() => {
            toast.error(t('login.error'));
        })
    };

    async function handleForgotPassword() {
        await axios.get(`${api}/user/sendResetPasswordEmail?email=${email}`).then(() => {
            toast.success(t('login.emailSent'));
        }).catch(() => {
            toast.warning(t('login.emailFail'));
        })
    };

    function handleInputFilled() {
        if (email && password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    async function googleConnect() {
        await axios.get(`${api}/user/oauth/google/urlLogin`).then(res => {
            window.location.assign(res.data)
        })
    }

    useEffect(() => {
        handleInputFilled();
        if (cookies.get('loginToken')) {
            window.location.replace('/home');
        }
    });

    return (
        <>
            <Navbar />
            <div className="Login">
                <div className='Login-container'>
                    <div className='Login-wrapper'>
                        <h1 className='Login-title'>{t('login.title')}</h1>
                        <form className='Login-form' onSubmit={handleSubmit}>
                            <div className="Login-form-group field">
                                <input type="email" className="Login-form-field" placeholder="Email" name="email" id='email' data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label htmlFor="email" className="Login-form-label">{t('login.email')}</label>
                            </div>
                            <div className="Login-form-group field">
                                <input type="password" className="Login-form-field" placeholder="Password" name="password" id='password' data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label htmlFor="password" className="Login-form-label">{t('login.password')}</label>
                            </div>
                            <button className={buttonDisabled ? 'Login-submit-button disabled' : 'Login-submit-button'} type='submit' aria-label='button-login' disabled={buttonDisabled}>
                                {t('login.button')}
                            </button>
                        </form>
                        <div>
                            <button className='Login-forgot-password-button' onClick={onOpenModal} aria-label='login-forgot-password-button'>{t('login.forgotPassword')}</button>
                            <Modal className='Login-modal' style={{ content: { background: "rgba(45,45,45,1)" } }} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenModal} onRequestClose={onCloseModal}>
                                <button className='Login-close-button' aria-label="cancel_close_button" onClick={onCloseModal}>
                                    <RxCrossCircled />
                                </button>
                                <div className='Login-title-top'>{t('login.forgotPasswordTitleTop')}</div>
                                <div className='Login-title'>{t('login.forgotPasswordTitle')}</div>
                                <div className='Login-box-email'>
                                    <input type="email" className="Login-email-input" placeholder={t('login.email') || ''} defaultValue={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <button className={buttonDisabled ? 'Login-send-mail-button disabled' : 'Login-send-mail-button'} onClick={handleForgotPassword} aria-label='button-send-mail-forgot-password'><FiSend className='Login-title-icons' size={30} /></button>
                                </div>
                            </Modal>
                        </div>
                        <div className='Login-connections'>
                            <button className='Login-button-api' data-testid="google-link" onClick={googleConnect}>
                                <FaGoogle />
                            </button>
                        </div>
                        <div className='Login-redirection-to-register'>
                            <span>
                                {t('login.no_account')}
                            </span>
                            <span className='Login-link'>
                                <Link to='/register' data-testid="link-register">{t('login.no_account_click')}</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <FooterNoConnected />
        </>
    );
}

export default LoginPage;