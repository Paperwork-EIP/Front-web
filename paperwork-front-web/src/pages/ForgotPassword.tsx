import React, { useState } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import "../styles/ForgotPassword.css";

function ForgotPasswordPage() {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    return (
        <>
            <Header/>
            <div className="fp-image">
                <img src="assets/forgotpassword-page/ForgotPassword-bro.svg" alt="ForgotPassword_bro_image" />
            </div>
            <input placeholder='Email' type="email" className="fp-user-email"></input>
            <button className="fp-button">Envoyer</button>
        </>
    );
}

export default ForgotPasswordPage;