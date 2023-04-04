import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "../styles/components/Navbar.scss";

function Navbar() {
    const [isShrunk, setShrunk] = useState("Navbar-not-shrunk");

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setShrunk("Navbar");
            } else {
                setShrunk("Navbar-not-shrunk");
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
                <Link to="/" className="Navbar-link-active" data-testid="Navbar-link-1">
                    Home
                </Link>
                <Link to="/login" className="Navbar-link" data-testid="Navbar-link-2">
                    Login
                </Link>
                <Link to="/register" className="Navbar-link" data-testid="Navbar-link-3">
                    Register
                </Link>
                <Link to="/help" className="Navbar-link" data-testid="Navbar-link-4">
                    Help
                </Link>
            </nav>
        </header>
    )
}

export default Navbar;