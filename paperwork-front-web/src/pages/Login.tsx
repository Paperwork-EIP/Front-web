import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { signIn } from "../api/Auth";
import { ApiCall, callbackhandle } from "../api/ApiCall";
import Navbar from '../components/Navbar';

import "../styles/pages/Login.scss";

const cookies = new Cookies();

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [setColor] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        callbackhandle(ApiCall.SIGNIN, (await signIn(email, password))!, setColor);
        window.location.assign("/home");
    };

    const googleConnect = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/urlLogin`).then(res => {
            window.location.replace(res.data)
        })
    }
    const facebookConnect = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`).then(res => {
            window.location.replace(res.data)
        })
    }
    if (cookies.get('loginToken')) {
        window.location.assign('/home');
    }
    return (
        <div className="Login">
            <Navbar />
            <div className='Login-container'>
                <h1 className='Login-title'>Login</h1>
                <form className='Login-form' onSubmit={handleSubmit}>
                    <div className="Login-form-group field">
                        <input type="email" className="Login-form-field" placeholder="Email" name="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email" className="Login-form-label">Email</label>
                    </div>
                    <div className="Login-form-group field">
                        <input type="password" className="Login-form-field" placeholder="Password" name="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="password" className="Login-form-label">Password</label>
                    </div>
                    <button className='Login-submit-button' type="submit">
                        Login
                    </button>
                </form>
                <div className='Login-connections'>
                    <button className='Login-button-api' onClick={googleConnect}>
                        <FaGoogle />
                    </button>
                    <button className='Login-button-api' onClick={facebookConnect}>
                        <FaFacebook />
                    </button>
                </div>
                <div className='Login-redirection-to-register'>
                    <span>
                        You don't have an account ?
                    </span>
                    <span className='Login-link'>
                        <Link to='/register'>Click here !</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;