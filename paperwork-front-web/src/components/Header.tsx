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

    function checkAvatar(url: string) {
        if (url) {
            setAvatar(url);
        }
    }
    function handleClickOutside(event: any) {
        if (event.target.className === 'Header-modal') {
            setIsOpen(false);
        }
    }

    function openModal() {
        const state = !isOpen;
        setIsOpen(state);
    }

    function logout() {
        cookies.remove('loginToken');
    }

    function getData() {
        if (!cookies.get('loginToken')) {
            window.location.replace('/');
        }
        else {
            axios.get(`${api}/user/getbytoken`, {
                params: { email: cookiesInfo.token }
            })
                .then(res => {
                    setName(res.data.username);
                    setEmail(res.data.email);
                    checkAvatar(res.data.profile_picture);
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }

    useEffect(() => {
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
                        <Link to='/quiz' data-testid="link-quiz" className={colorMode === 'light' ? "Header-button Day-mode" : "Header-button Night-mode"}>
                            <MdOutlineAdd />
                        </Link>
                        <button className={colorMode === 'light' ? "Header-button Day-mode" : "Header-button Night-mode"} aria-label="button-mode" onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MdModeNight /> : <MdLightMode />}
                        </button>
                        <button className="Header-avatar-button" aria-label="button-open-modal" onClick={openModal}>
                            <img className="Header-avatar" src={avatar} alt="avatar-header" />
                        </button>
                        {isOpen && (
                            <div className="Header-modal"data-testid="Header-modal" >
                                <div className={colorMode === 'light' ? "Header-modal-content Day-mode" : "Header-modal-content Night-mode"}>
                                    <img src={avatar} alt="avatar-modal-header" className="Header-modal-profile-picture" />
                                    <h2>{name}</h2>
                                    <p>{email}</p>
                                    <div className="Header-separator"></div>
                                    <Link to='/home' data-testid="link-home" className="Header-modal-link">
                                        <MdHome />
                                        <span>Home</span>
                                    </Link>
                                    <Link to='/profile' data-testid="link-profile" className="Header-modal-link">
                                        <MdPerson />
                                        <span>Profile</span>
                                    </Link>
                                    <Link to='/calendar' data-testid="link-calendar" className="Header-modal-link">
                                        <MdCalendarMonth />
                                        <span>Calendar</span>
                                    </Link>
                                    <Link to='/help' data-testid="link-help" className="Header-modal-link">
                                        <MdHelpOutline />
                                        <span>Help</span>
                                    </Link>
                                    <button className="Header-modal-link" aria-label='button-logout' onClick={logout}>
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