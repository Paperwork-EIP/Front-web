import React, { useState, useEffect } from "react";
import { useColorMode } from '@chakra-ui/react';
import { MdCalendarMonth, MdHelpOutline, MdHome, MdLightMode, MdLogout, MdModeNight, MdOutlineAdd, MdPerson } from 'react-icons/md';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";

import "../styles/components/Header.scss";

function Header() {
    const cookies = new Cookies();
    const cookiesInfo = cookies.get('loginToken');
    const api = process.env.REACT_APP_BASE_URL;

    const { colorMode, toggleColorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('Username');
    const [email, setEmail] = useState('email@example.com');
    const [avatar, setAvatar] = useState('/assets/header/empty-profile-picture.jpg');

    function checkIfCookie() {
        if (!cookies.get('loginToken')) {
            window.location.replace('/');
        }
    }

    function checkAvatar(url: string) {
        if (url) {
            setAvatar(url);
        }
    }
    function handleClickOutside(event: any) {
        if (event.target.className === 'Header-modal') {
            closeModal();
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function logout() {
        cookies.remove('loginToken');
        checkIfCookie();
    }

    function getData() {
        axios.get(`${api}/user/getbyemail`, {
            params: { email: cookiesInfo.email }
        })
            .then(res => {
                console.log(res);
                setName(res.data.username);
                setEmail(res.data.email);
                checkAvatar(res.data.profile_picture);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        checkIfCookie();
        getData();
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })

    return (
        <div className={colorMode === 'light' ? "Header Day-mode" : "Header Night-mode"}>
            <div className="Header-container">
                <div className="Header-left-side">
                    <div className="Header-logo">
                        <img src="/logo.png" alt="logo-paperwork-header" />
                    </div>
                </div>
                <div className="Header-right-side">
                    <div className="Header-right-content">
                        <Link to='/quiz' className={colorMode === 'light' ? "Header-button Day-mode" : "Header-button Night-mode"}>
                            <MdOutlineAdd />
                        </Link>
                        <button className={colorMode === 'light' ? "Header-button Day-mode" : "Header-button Night-mode"} onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MdModeNight /> : <MdLightMode />}
                        </button>
                        <button className="Header-avatar-button" onClick={openModal}>
                            <img className="Header-avatar" src={avatar} alt="avatar-header" />
                        </button>
                        {isOpen && (
                            <div className="Header-modal">
                                <div className={colorMode === 'light' ? "Header-modal-content Day-mode" : "Header-modal-content Night-mode"}>
                                    <img src={avatar} alt="avatar-modal-header" className="Header-modal-profile-picture" />
                                    <h2>{name}</h2>
                                    <p>{email}</p>
                                    <div className="Header-separator"></div>
                                    <Link to='/home' className="Header-modal-link">
                                        <MdHome />
                                        <span>Home</span>
                                    </Link>
                                    <Link to='/profile' className="Header-modal-link">
                                        <MdPerson />
                                        <span>Profile</span>
                                    </Link>
                                    <Link to='/calendar' className="Header-modal-link">
                                        <MdCalendarMonth />
                                        <span>Calendar</span>
                                    </Link>
                                    <Link to='/help' className="Header-modal-link">
                                        <MdHelpOutline />
                                        <span>Help</span>
                                    </Link>
                                    <button className="Header-modal-link" onClick={logout}>
                                        <MdLogout />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;