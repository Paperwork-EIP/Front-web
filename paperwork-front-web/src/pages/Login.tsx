import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useDisclosure } from '@chakra-ui/react';
import Modal from 'react-modal';

import Navbar from '../components/Navbar';

import "../styles/pages/Login.scss";

const LoginPage = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    
    const cookies = new Cookies();
    const { t } = useTranslation();

    function handleSubmit() {
        axios.post(
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
            alert(t('login.error'));
        })
    };

    function handleForgotPassword() {
        axios.get(
        `${api}/user/sendResetPasswordEmail?email=${email}`,
        ).then(res => {
            alert("Email sent successfully!");
        }).catch(err => {
            alert("Failure to send the verification email");
            console.log(err);
        })
    };

    function handleinputFilled() {
        if (email && password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    function googleConnect() {
        axios.get(`${api}/oauth/google/urlLogin`).then(res => {
            window.location.replace(res.data)
        })
    }

    function facebookConnect() {
        axios.get(`${api}/oauth/facebook/url`).then(res => {
            window.location.replace(res.data)
        })
    }

    useEffect(() => {
        handleinputFilled();
        if (cookies.get('loginToken')) {
            window.location.replace('/home');
        }
    });

    return (
        <div className="Login">
            <Navbar />
            <div className='Login-container'>
                <div className='Login-container-right'>
                    <h1 className='Login-title'>{t('login.title')}</h1>
                    <div className='Login-form'>
                        <div className="Login-form-group field">
                            <input type="email" className="Login-form-field" placeholder="Email" name="email" id='email' data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email" className="Login-form-label">{t('login.email')}</label>
                        </div>
                        <div className="Login-form-group field">
                            <input type="password" className="Login-form-field" placeholder="Password" name="password" id='password' data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="password" className="Login-form-label">{t('login.password')}</label>
                        </div>
                        <button className='Login-forgot-password-button' onClick={onOpenModal}>Forgot Password</button>
                        <Modal className='Login-modal' style={{content:{background: "rgba(45,45,45,1)"}}} overlayClassName='process-idea-modal-cancel-overlay' isOpen={isOpenModal} onRequestClose={onCloseModal}>
                            <button className='Login-close-button' aria-label="cancel_close_button" onClick={onCloseModal}>
                                <RxCrossCircled/>
                            </button>
                            <div className='Login-title-top'>Forgot Password ?</div>
                            <div className='Login-title'>Confirm the mailbox where you want us to send you your new password</div>
                            <div className='Login-box-email'>
                            <input type="email" className="Login-email-input" placeholder="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} required />
                                <button className={buttonDisabled ? 'Login-send-mail-button disabled' : 'Login-send-mail-button'} onClick={handleForgotPassword}><FiSend className='Login-title-icons' size={30}/></button>
                            </div>
                        </Modal>
                        <button className={buttonDisabled ? 'Login-submit-button disabled' : 'Login-submit-button'} type='submit' aria-label='button-login' onClick={handleSubmit} disabled={buttonDisabled}>
                            {t('login.button')}
                        </button>
                    </div>
                    <div className='Login-connections'>
                        <button className='Login-button-api' data-testid="google-link" onClick={googleConnect}>
                            <FaGoogle />
                        </button>
                        <button className='Login-button-api' data-testid="facebook-link" onClick={facebookConnect}>
                            <FaFacebook />
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
                <div className='Login-container-left'>
                    <img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0" alt="background-login-screen" />
                    <div className='Login-on-image-text'>
                        <h1>{t('login.text_1')}</h1>
                        <h3>{t('login.text_2')}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;