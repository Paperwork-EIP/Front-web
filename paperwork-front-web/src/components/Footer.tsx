import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "../styles/components/Footer.scss";

function FooterNoConnected() {
    const { t } = useTranslation();

    return (
        <div className="Footer-container">
            <div className="Footer-body">
                <div className="Footer-content">
                    <div className="Footer-title" data-testid="Footer-title">
                        <img src="logo.png" alt="logo-paperwork" />
                        <h1>{t('welcome.footer_title')}</h1>
                    </div>
                    <div className="Footer-infos" data-testid="Footer-infos">
                        <div className="Footer-info">
                            <Link to="/aboutus">
                                <button data-testid="Footer-about-link">{t('welcome.footer_aboutus')}</button>
                            </Link>
                        </div>
                        <div className="Footer-info">
                            <Link to="/register">
                                <button data-testid="Footer-register-link">{t('welcome.footer_register')}</button>
                            </Link>
                        </div>
                        <div className="Footer-info">
                            <Link to="/login">
                                <button data-testid="Footer-login-link">{t('welcome.footer_login')}</button>
                            </Link>
                        </div>
                        <div className="Footer-info">
                            <a href="mailto:no-reply@paperwork-fr.com">
                                <button data-testid="Footer-contact-link">{t('welcome.footer_contact')}</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Footer-separator"></div>
        </div>
    )
}

export default FooterNoConnected;