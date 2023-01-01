import React from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

const FacebookPage = () => {
    const api = process.env.REACT_APP_BASE_URL;
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    if(!code) {
        console.log('Error');
        window.location.assign("/");
    } else {
    axios.get(`${api}/oauth/facebook/?code=${code}`).then(res => {
        cookies.set('loginToken', res.data.jwt, {
            path:'/',
            secure:true,
            sameSite:'none'
        });
        window.location.assign("/home");
      })
    }
    return (
        <div></div>
    );
}

export default FacebookPage;