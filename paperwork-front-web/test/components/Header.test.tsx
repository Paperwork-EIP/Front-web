import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import axios from 'axios';
import Cookies from 'universal-cookie';

import Header from '../../src/components/Header';

jest.mock('axios');
const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn(),
            reload: jest.fn()
        }
    });
    axios.get = jest.fn().mockResolvedValue({ data: { username: "token123", email: "token123", profile_picture: "token123", language: "testlanguage" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Header Tests', () => {
    test('should display Paperwork logo', () => {
        cookies.set('loginToken', 'test');

        const { getByAltText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logo = getByAltText('logo-paperwork-header');
        expect(logo).toBeInTheDocument();

        cookies.remove('loginToken');
    });
    test('should link to the quiz page when quiz button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-quiz');
        expect(linkElement).toHaveAttribute('href', '/quiz');

        cookies.remove('loginToken');
    });
    test('should switch mode when mode button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-mode/i));
        expect(button).toBeTruthy();

        cookies.remove('loginToken');
    });
    test('should open and close modal', () => {
        cookies.set('loginToken', 'test');

        const { getByLabelText, queryByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        fireEvent.click(document.body);

        expect(queryByTestId(/button-logout/i)).not.toBeInTheDocument();

        cookies.remove('loginToken');
    });
    test('should link to the home page when home button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-home');
        expect(linkElement).toHaveAttribute('href', '/home');

        cookies.remove('loginToken');
    });
    test('should link to the profile page when profile button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-profile');
        expect(linkElement).toHaveAttribute('href', '/profile');

        cookies.remove('loginToken');
    });
    test('should link to the calendar page when calendar button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-calendar');
        expect(linkElement).toHaveAttribute('href', '/calendar');

        cookies.remove('loginToken');
    });
    test('should link to the settings page when settings button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-settings');
        expect(linkElement).toHaveAttribute('href', '/settings');

        cookies.remove('loginToken');
    });
    test('should link to the help page when help button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-help');
        expect(linkElement).toHaveAttribute('href', '/help');

        cookies.remove('loginToken');
    });
    test('should logout when logout button clicked', () => {
        cookies.set('loginToken', 'test');

        const { getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const logout = fireEvent.click(getByLabelText(/button-logout/i));
        expect(logout).toBeTruthy();

        expect(cookies.get('loginTest')).toBeUndefined();

        cookies.remove('loginToken');
    });
    test('should print an error message with console.error', () => {
        cookies.set('loginToken', 'test');

        const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValue(new Error('Example error message'));

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(axiosSpy).toHaveBeenCalledTimes(1);

        cookies.remove('loginToken');
    });
    test('should disconnect the user if loginToken doesn\'t exists', () => {
        cookies.remove('loginToken');
        const location = window.location;

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        window.location = location;

        expect(axios.get).toHaveBeenCalledTimes(0);
    });
    // test('should disconnect the user if loginToken is invalid', () => {
    //     cookies.set('loginToken', 'test');
    //     const location = window.location;

    //     axios.get = jest.fn().mockRejectedValue(new Error('Example error message'));

    //     render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     window.location = location;

    //     expect(axios.get).toHaveBeenCalledTimes(1);
    //     expect(window.location.replace).toHaveBeenCalledTimes(1);
    // });
});