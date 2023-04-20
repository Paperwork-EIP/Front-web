import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

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

    function handleSubmit() {
        axios.post(`${api}/user/register`,
            {
                username: username,
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
            alert("Email, username or password is incorrect.");
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
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/urlLogin`).then(res => {
            window.location.replace(res.data)
        })
    }

    function facebookConnect() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`).then(res => {
            window.location.replace(res.data)
        })
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
                    <h1 className='Register-title'>Register</h1>
                    <div className='Register-form'>
                        <div className="Register-form-group field">
                            <input type="email" className="Register-form-field" placeholder="Email" name="email" id='email' data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email" className="Register-form-label">Email</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="text" className="Register-form-field" placeholder="Username" name="username" id='username' data-testid="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="username" className="Register-form-label">Username</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="password" className="Register-form-field" placeholder="Password" name="password" id='password' data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="password" className="Register-form-label">Password</label>
                        </div>
                        <div className="Register-form-group field">
                            <input type="password" className="Register-form-field" placeholder="Confirm password" name="confirmPassword" id='confirmPassword' data-testid="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <label htmlFor="confirmPassword" className="Register-form-label">Confirm password</label>
                        </div>
                        <button className={buttonDisabled ? 'Register-submit-button disabled' : 'Register-submit-button'} aria-label='button-register' onClick={handleSubmit} disabled={buttonDisabled}>
                            Register
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
                    <div className='Register-redirection-to-register'>
                        <span>
                            You already have an account ?
                        </span>
                        <span className='Register-link'>
                            <Link to='/login' data-testid="link-login">Click here !</Link>
                        </span>
                    </div>
                </div>
                <div className='Register-container-left'>
                    <img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0" alt="background-Register-screen" />
                    <div className='Register-on-image-text'>
                        <h1>Join us !</h1>
                        <h3>Create your account with an email address or by Google/Facebook</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;