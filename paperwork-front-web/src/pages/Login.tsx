import React from 'react';
import LoginContent from '../container/Login/LoginContent';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginPage = () => {
    if(cookies.get('loginToken')) {
        window.location.assign('/home');
    }
    return (
        <LoginContent/>
    );
}

export default LoginPage;