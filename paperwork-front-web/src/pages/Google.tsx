import React from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

const GooglePage = () => {
    const api = process.env.REACT_APP_BASE_URL;
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    console.log(code);
    if(!code) {
        window.location.assign("/");
    } else {
        axios.get(`${api}/oauth/google/login?code=${code}`).then(res => {
            console.log(res);
            cookies.set('loginToken', { token: res.data.jwt, email: res.data.email }, {
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

export default GooglePage;