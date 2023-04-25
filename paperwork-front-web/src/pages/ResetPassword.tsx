import React from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import "../styles/ResetPassword.css";

function ResetPasswordPage() {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    return (
        <>
            <Header/>
            <div className="fp-image">
                <img src="assets/resetpassword-page/ResetPassword-bro.svg" alt="ResetPassword_bro_image" />
            </div>
            <input placeholder='Email' type="email" className="fp-user-email"></input>
            <button className="fp-button">Envoyer</button>
        </>
    );
}

export default ResetPasswordPage;