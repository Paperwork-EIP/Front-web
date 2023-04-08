import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

import "../styles/pages/Login.scss";

const LoginPage = () => {

    const api = process.env.REACT_APP_BASE_URL;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();

    async function handleSubmit() {
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
            alert("Email or password is incorrect.");
            return;
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
                    <h1 className='Login-title'>Login</h1>
                    <div className='Login-form'>
                        <div className="Login-form-group field">
                            <input type="email" className="Login-form-field" placeholder="Email" name="email" id='email' data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="email" className="Login-form-label">Email</label>
                        </div>
                        <div className="Login-form-group field">
                            <input type="password" className="Login-form-field" placeholder="Password" name="password" id='password' data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="password" className="Login-form-label">Password</label>
                        </div>
                        <button className={buttonDisabled ? 'Login-submit-button disabled' : 'Login-submit-button'} type='submit' aria-label='button-login' onClick={handleSubmit} disabled={buttonDisabled}>
                            Login
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
                            You don't have an account ?
                        </span>
                        <span className='Login-link'>
                            <Link to='/register' data-testid="link-register">Click here !</Link>
                        </span>
                    </div>
                </div>
                <div className='Login-container-left'>
                    <img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0" alt="background-login-screen" />
                    <div className='Login-on-image-text'>
                        <h1>Welcome back !</h1>
                        <h3>You can sign in with your existing account</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;