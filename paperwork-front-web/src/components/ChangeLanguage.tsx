import React from 'react';
import { useTranslation } from 'react-i18next';

import "../styles/components/ChangeLanguage.scss";

function ChangeLanguage() {
    const { t, i18n } = useTranslation();

    function changeLanguageHandler(language: string | undefined) {
        i18n.changeLanguage(language);
    }

    return (
        <div className="languages">
            <div className="buttons">
                <button className="button" data-testid="button-fr" onClick={() => changeLanguageHandler("fr")}>
                    <span className="text-button">{t('button.fr')}</span>
                </button>
                <button className="button" data-testid="button-en" onClick={() => changeLanguageHandler("en")}>
                    <span className="text-button">{t('button.en')}</span>
                </button>
                <button className="button" data-testid="button-de" onClick={() => changeLanguageHandler("de")}>
                    <span className="text-button">{t('button.de')}</span>
                </button>
                <button className="button" data-testid="button-kr" onClick={() => changeLanguageHandler("kr")}>
                    <span className="text-button">{t('button.kr')}</span>
                </button>
                <button className="button" data-testid="button-id" onClick={() => changeLanguageHandler("id")}>
                    <span className="text-button">{t('button.id')}</span>
                </button>
                <button className="button" data-testid="button-es" onClick={() => changeLanguageHandler("es")}>
                    <span className="text-button">{t('button.es')}</span>
                </button>
            </div>
        </div>
    )
}

export default ChangeLanguage;