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
            <select defaultValue={i18n.language} name="language" id="language" className="language" data-testid="language" onChange={(e) => changeLanguageHandler(e.target.value)}>
                <option value="fr" data-testid="button-fr">{t('button.fr')}</option>
                <option value="en" data-testid="button-en">{t('button.en')}</option>
                <option value="de" data-testid="button-de">{t('button.de')}</option>
                <option value="kr" data-testid="button-kr">{t('button.kr')}</option>
                <option value="id" data-testid="button-id">{t('button.id')}</option>
                <option value="es" data-testid="button-es">{t('button.es')}</option>
            </select>
        </div>
    )
}

export default ChangeLanguage;