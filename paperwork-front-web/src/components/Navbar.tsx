import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "../styles/components/Navbar.scss";

function Navbar() {

    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        });
        return () => window.removeEventListener("Navbar", () => { });
    }, [isShrunk]);

    return (
        <header className={`${isShrunk ? 'Navbar' : ''}`}>
            <h2 className="Navbar-title">
                <img className='Navbar-logo' src="logo.png" alt="logo-paperwork" />
            </h2>
            
            <nav className="Navbar-nav">
                <Link to="/" className="Navbar-link-active">
                    Home
                </Link>
                <Link to="/login" className="Navbar-link">
                    Login
                </Link>
                <Link to="/register" className="Navbar-link">
                    Register
                </Link>
                <Link to="/about" className="Navbar-link">
                    Help
                </Link>
            </nav>
        </header>
    )
}

export default Navbar;