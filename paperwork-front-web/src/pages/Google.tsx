import React from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

const GooglePage = () => {
    const api = "http://localhost:8080";
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    console.log(code);
    if(!code) {
        window.location.assign("/");
    } else {
        axios.get(`${api}/oauth/google/login?code=${code}`).then(res => {
            console.log(res);
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

export default GooglePage;