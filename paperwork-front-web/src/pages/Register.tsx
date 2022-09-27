import React from 'react';
import Register from '../container/Register/Register';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const RegisterPage = () => {
    if(cookies.get('loginToken')) {
        window.location.assign('/home');
    }
    return (
        <Register/>
    );
}

export default RegisterPage;