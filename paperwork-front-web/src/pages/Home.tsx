import React from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const HomePage = () => {
    if(!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    return (
        <Header/>
    );
}

export default HomePage;