import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ChangeLanguage from './ChangeLanguage';

import "../styles/components/Navbar.scss";

function Navbar() {
    const [isShrunk, setIsShrunk] = useState("Navbar-not-shrunk");
    const { t } = useTranslation();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setIsShrunk("Navbar");
            } else {
                setIsShrunk("Navbar-not-shrunk");
            }
        });
        return () => window.removeEventListener("Navbar", () => { });
    }, [isShrunk]);

    return (
        <header className={`${isShrunk}`}>
            <h2 className="Navbar-title">
                <img className='Navbar-logo' src="logo.png" alt="logo-paperwork" />
            </h2>
            <nav className="Navbar-nav">
                <div>
                    <Link to="/" className="Navbar-link" data-testid="Navbar-link-1">
                        {t('navbar.link_1')}
                    </Link>
                    <Link to="/login" className="Navbar-link-active" data-testid="Navbar-link-2">
                        {t('navbar.link_2')}
                    </Link>
                    <Link to="/register" className="Navbar-link-active" data-testid="Navbar-link-3">
                        {t('navbar.link_3')}
                    </Link>
                    <Link to="/aboutus" className="Navbar-link-active" data-testid="Navbar-link-4">
                        {t('navbar.link_4')}
                    </Link>
                </div>
                <ChangeLanguage />
            </nav>
        </header>
    )
}

export default Navbar;