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
            </div>
        </div>
    )
}

export default ChangeLanguage;