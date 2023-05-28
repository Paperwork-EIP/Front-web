import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ChangeLanguage from '../../src/components/ChangeLanguage';

afterEach(cleanup);
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: any) => key,
        i18n: { changeLanguage: jest.fn() }
    })
}));

describe('Change Language Component Tests', () => {
    test('should display languages selection in navbar', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <ChangeLanguage />
            </BrowserRouter>
        );

        const button_fr = getByTestId("button-fr");
        const button_en = getByTestId("button-en");

        const click_fr = fireEvent.click(button_fr);
        const click_en = fireEvent.click(button_en);

        expect(button_fr).toBeInTheDocument();
        expect(button_en).toBeInTheDocument();
        expect(click_fr).toBeTruthy();
        expect(click_en).toBeTruthy();
    });
});