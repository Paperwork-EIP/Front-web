import React from 'react';
import Header from '../components/Header';
import Bg from '../container/Home/HomeContent';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const HomePage = () => {
    if(!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    return (
        <>
            <Header/>
            <Bg/>
        </>
    );
}

export default HomePage;