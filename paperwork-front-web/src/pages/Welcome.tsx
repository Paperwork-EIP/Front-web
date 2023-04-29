import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

import Navbar from "../components/Navbar";

import "../styles/pages/Welcome.scss";

function WelcomePage() {
    const cookies = new Cookies();

    function redirectToHome() {
        if (cookies.get('loginToken')) {
            window.location.replace('/home');
        }
    }

    useEffect(() => {
        redirectToHome();
    });

    return (
        <div className="Welcome">
            <Navbar />
            <div className="Header-container">
                <div className="Header-description">
                    <h3 className="Header-description-title">Paperwork</h3>
                    <p className="Header-description-text">
                        A tool to help you for the most annoying task.
                    </p>
                    <Link to="/login">
                        <button
                            className="Header-description-button"
                            data-testid="Header-description-button"
                        >
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
            <div className="Welcome-container">
                <div className="Welcome-title">
                    <h1>What is Paperwork ?</h1>
                </div>
                <div className="Welcome-description">
                    <p>An app to help you for your administrative tasks</p>
                </div>
                <div className="Welcome-sections">
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <img
                                src="assets/welcome-page/tiredness-animate.svg"
                                alt="tiredness_image"
                            />
                        </div>
                        <div className="Welcome-section-left">
                            <h4>Tired of paperwork ?</h4>
                            <p>
                                Tired of administrative paperwork ? Here is{" "}
                                <strong>PAPERWORK</strong>, an application that guides step by
                                step in your procedures. the objective of this application is to
                                simplify administrative procedures by providing an intuitive and
                                accessible platform for users.
                            </p>
                        </div>
                    </section>
                    <div className="Welcome-separator"></div>
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <h4>A quiz to save time</h4>
                            <p>
                                Thanks to our quiz, you will know exactly the steps to follow
                                for the desired procedure.
                            </p>
                        </div>
                        <div className="Welcome-section-left">
                            <img
                                src="assets/welcome-page/done-animate.svg"
                                alt="done_image"
                            />
                        </div>
                    </section>
                    <div className="Welcome-separator"></div>
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <img
                                src="assets/welcome-page/accessible-phone-animate.svg"
                                alt="accessible_from_phone_image"
                            />
                        </div>
                        <div className="Welcome-section-left">
                            <h4>Stay alerted to remind you your unfinshed tasks</h4>
                            <p>
                                Your progress is saved for each step you start and receive
                                notifications directly in the mobile application to inform you
                                of your steps to be completed and your next appointments.
                            </p>
                        </div>
                    </section>
                </div>
                <div className="Welcome-download">
                    <h2 className="Welcome-download-title">
                        Download our Android/IOS application to get more flexibility !
                    </h2>
                    <div className="Welcome-download-links">
                        <a className="Welcome-download-link" href="files/paperwork.apk" download="paperwork.apk">
                            Download
                        </a>
                    </div>
                </div>
            </div>
            <div className="Footer-container">
                <div className="Footer-body">
                    <div className="Footer-content">
                        <div className="Footer-title" data-testid="Footer-title">
                            <img src="logo.png" alt="logo-paperwork" />
                            <h1>Paperwork</h1>
                        </div>
                        <div className="Footer-infos" data-testid="Footer-infos">
                            <div className="Footer-info">
                                <Link to="/aboutus">
                                    <button data-testid="Footer-about-link">About Us</button>
                                </Link>
                            </div>
                            <div className="Footer-info">
                                <Link to="/register">
                                    <button data-testid="Footer-register-link">Register</button>
                                </Link>
                            </div>
                            <div className="Footer-info">
                                <Link to="/login">
                                    <button data-testid="Footer-login-link">Login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Footer-separator"></div>
            </div>
        </div>
    );
}

export default WelcomePage;
