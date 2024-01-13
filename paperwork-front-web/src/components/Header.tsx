import React, { useState, useEffect } from "react";
import { useColorMode } from '@chakra-ui/react';
import { MdCalendarMonth, MdHelpOutline, MdHome, MdLightMode, MdLogout, MdModeNight, MdOutlineAdd, MdPerson, MdSettings } from 'react-icons/md';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";

import { getTranslation } from '../pages/Translation';

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
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "header");

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

        if (!cookies.get('loginToken')) {
            window.location.replace('/');
        }
    }

    function checkIfCookieExist() {
        if (!cookiesInfo || !cookiesInfo.loginToken) {
            window.location.replace("/login");
        } else {
            checkTokenInDatabase();
        }
    }

    async function checkTokenInDatabase() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } }
        ).then((res) => {
            switch (res.status) {
                case 200:
                    break;
                default:
                    cookies.remove('loginToken');
                    window.location.replace("/login");
                    break;
            }
        }).catch(() => {
            cookies.remove('loginToken');
            window.location.replace("/login");
        });
    }

    async function getData() {
        if (cookiesInfo && cookiesInfo.loginToken) {
            await axios.get(`${api}/user/getbytoken`, {
                params: { token: cookiesInfo.loginToken }
            })
                .then((res) => {
                    setName(res.data.username);
                    setEmail(res.data.email);
                    setLanguage(res.data.language);
                    checkAvatar(res.data.profile_picture);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkIfCookieExist();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        getData();
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen])

    return (
        <div className={colorMode === 'light' ? "Header Day-mode-secondary" : "Header Night-mode-secondary"}>
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
                        {
                            isOpen && (
                                <div className="Header-modal" data-testid="Header-modal" >
                                    <div className={colorMode === 'light' ? "Header-modal-content Day-mode" : "Header-modal-content Night-mode-secondary"}>
                                        <img src={avatar} alt="avatar-modal-header" className="Header-modal-profile-picture" />
                                        <h2>{name}</h2>
                                        <p>{email}</p>
                                        <div className="Header-separator"></div>
                                        <Link to='/home' data-testid="link-home" className="Header-modal-link">
                                            <MdHome />
                                            <span>{translation.home}</span>
                                        </Link>
                                        <Link to='/profile' data-testid="link-profile" className="Header-modal-link">
                                            <MdPerson />
                                            <span>{translation.profile}</span>
                                        </Link>
                                        <Link to='/calendar' data-testid="link-calendar" className="Header-modal-link">
                                            <MdCalendarMonth />
                                            <span>{translation.calendar}</span>
                                        </Link>
                                        <Link to='/settings' data-testid="link-settings" className="Header-modal-link">
                                            <MdSettings />
                                            <span>{translation.settings}</span>
                                        </Link>
                                        <Link to='/help' data-testid="link-help" className="Header-modal-link">
                                            <MdHelpOutline />
                                            <span>{translation.help}</span>
                                        </Link>
                                        <button className="Header-modal-link" aria-label='button-logout' onClick={logout}>
                                            <MdLogout />
                                            <span>{translation.logout}</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;