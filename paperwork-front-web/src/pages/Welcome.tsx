import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

import Navbar from "../components/Navbar";
import FooterNoConnected from "../components/Footer";

import "../styles/pages/Welcome.scss";

function WelcomePage() {
    const cookies = new Cookies();
    const { t } = useTranslation();

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
                    <h3 className="Header-description-title">
                        {t('welcome.header_title')}
                    </h3>
                    <p className="Header-description-text">
                        {t('welcome.header_description')}
                    </p>
                    <Link to="/login">
                        <button className="Header-description-button" data-testid="Header-description-button">
                            {t('welcome.header_start_button')}
                        </button>
                    </Link>
                </div>
            </div>
            <div className="Welcome-container">
                <div className="Welcome-title">
                    <h1>{t('welcome.container_title')}</h1>
                </div>
                <div className="Welcome-description">
                    <p>{t('welcome.container_description')}</p>
                    <div className="Welcome-description-cards">
                        <div className="Welcome-description-card">
                            <img src="/assets/welcome-page/icon-1.png" alt="icon-1" />
                            <span>{t('welcome.container_description_card_1')}</span>
                        </div>
                        <div className="Welcome-description-card">
                            <img src="/assets/welcome-page/icon-2.png" alt="icon-2" />
                            <span>{t('welcome.container_description_card_2')}</span>
                        </div>
                        <div className="Welcome-description-card">
                            <img src="/assets/welcome-page/icon-3.png" alt="icon-3" />
                            <span>{t('welcome.container_description_card_3')}</span>
                        </div>
                    </div>
                </div>
                <div className="Welcome-sections">
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <img
                                src="/assets/welcome-page/tired.png"
                                alt="tiredness_image"
                            />
                        </div>
                        <div className="Welcome-section-left">
                            <h4>{t('welcome.section_1_title')}</h4>
                            <p>
                                {t('welcome.section_1_text_1')}<strong>PAPERWORK</strong>{t('welcome.section_1_text_2')}
                            </p>
                        </div>
                    </section>
                    <div className="Welcome-separator"></div>
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <h4>{t('welcome.section_2_title')}</h4>
                            <p>
                                {t('welcome.section_2_text')}
                            </p>
                        </div>
                        <div className="Welcome-section-left">
                            <img
                                src="/assets/welcome-page/done.png"
                                alt="done_image"
                            />
                        </div>
                    </section>
                    <div className="Welcome-separator"></div>
                    <section className="Welcome-section">
                        <div className="Welcome-section-right">
                            <img
                                src="/assets/welcome-page/phone.png"
                                alt="accessible_from_phone_image"
                            />
                        </div>
                        <div className="Welcome-section-left">
                            <h4>{t('welcome.section_3_title')}</h4>
                            <p>
                                {t('welcome.section_3_text')}
                            </p>
                        </div>
                    </section>
                </div>
                <div className="Welcome-download">
                    <h2 className="Welcome-download-title">
                        {t('welcome.download_title')}
                    </h2>
                    <div className="Welcome-download-links">
                        <a className="Welcome-download-link" href="files/paperwork.apk" download="paperwork.apk">
                            {t('welcome.download_button_text')}
                        </a>
                    </div>
                </div>
            </div>
            <FooterNoConnected />
        </div>
    );
}

export default WelcomePage;
