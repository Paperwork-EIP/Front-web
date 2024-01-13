import React from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from "react-router-dom";
import axios from "axios";


function GooglePage() {
    const api = process.env.REACT_APP_BASE_URL;
    const search = useLocation().search;
    const cookies = new Cookies();
    const code = new URLSearchParams(search).get('code');

    if(!code) {
        window.location.replace("/login");
    } else {
        axios.get(`${api}/user/oauth/google/login?code=${code}`).then(res => {
            cookies.set('loginToken', { loginToken: res.data.jwt, email: res.data.email }, {
                path:'/',
                secure:true,
                sameSite:'none'
            });
            window.location.replace("/home");
        })
    }
    return (
        <div></div>
    );
}

export default GooglePage;