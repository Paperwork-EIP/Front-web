import React from 'react';
import Header from '../components/Header';
import Bg from '../container/Home/HomeContent';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// import GridBlurredBackdrop from '../container/Home/HomeContent';

const HomePage = (props: any) => {
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    return (
        <>
            <Header/>
            <Bg ongoingProcess={props}/>
        </>
    );
}

export default HomePage;