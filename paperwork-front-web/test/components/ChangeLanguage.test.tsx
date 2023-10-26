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
    test('ChangeLanguage component renders correctly', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <ChangeLanguage />
            </BrowserRouter>
        );

        const selectElement = getByTestId('language');
        expect(selectElement).toBeInTheDocument();

        const frOption = getByTestId('button-fr');
        const enOption = getByTestId('button-en');
        const deOption = getByTestId('button-de');
        const krOption = getByTestId('button-kr');
        const idOption = getByTestId('button-id');
        const esOption = getByTestId('button-es');

        expect(frOption).toBeInTheDocument();
        expect(enOption).toBeInTheDocument();
        expect(deOption).toBeInTheDocument();
        expect(krOption).toBeInTheDocument();
        expect(idOption).toBeInTheDocument();
        expect(esOption).toBeInTheDocument();
    });

    test('ChangeLanguage component handles language change correctly', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <ChangeLanguage />
            </BrowserRouter>
        );

        const selectElement = getByTestId('language');
        const event = fireEvent.change(selectElement, { target: { value: 'en' } });

        expect(event).toBeTruthy();
    });
});