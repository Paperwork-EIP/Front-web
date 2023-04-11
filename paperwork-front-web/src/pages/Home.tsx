import React from 'react';

import Cookies from 'universal-cookie';

import Header from '../components/Header';
import Bg from '../container/Home/HomeContent';

const cookies = new Cookies();

function HomePage() {
    if (!cookies.get('loginToken')) {
        window.location.replace('/');
    }

    return (
        <>
            <Header />
            <Bg />
        </>
    );
}

export default HomePage;