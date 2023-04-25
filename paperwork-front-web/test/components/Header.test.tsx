import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, getByLabelText, getByTestId, waitFor } from '@testing-library/react';

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
    axios.get = jest.fn().mockResolvedValue({ data: { username: "token123", email: "token123", profile_picture: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    cookies.set('loginToken', 'test');
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe('Header Tests', () => {
    test('should display Paperwork logo', () => {
        const { getByAltText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logo = getByAltText('logo-paperwork-header');
        expect(logo).toBeInTheDocument();
    });
    test('should link to the quiz page when quiz button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-quiz');
        expect(linkElement).toHaveAttribute('href', '/quiz');
    });
    test('should switch mode when mode button clicked', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-mode/i));
        expect(button).toBeTruthy();
    });
    test('should open and close modal', () => {
        const { getByLabelText, queryByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();
        
        fireEvent.click(document.body);

        expect(queryByTestId(/button-logout/i)).not.toBeInTheDocument();
    });
    test('should link to the home page when home button clicked', () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-home');
        expect(linkElement).toHaveAttribute('href', '/home');
    });
    test('should link to the profile page when profile button clicked', () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-profile');
        expect(linkElement).toHaveAttribute('href', '/profile');
    });
    test('should link to the calendar page when calendar button clicked', () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-calendar');
        expect(linkElement).toHaveAttribute('href', '/calendar');
    });
    test('should link to the help page when help button clicked', () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));
        expect(button).toBeTruthy();

        const linkElement = getByTestId('link-help');
        expect(linkElement).toHaveAttribute('href', '/help');
    });
    test('should logout when logout button clicked', () => {
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
    });
    test('should print an error message with console.error', () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValue(new Error('Example error message'));

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(axiosSpy).toHaveBeenCalledTimes(1);
    });
    test('should disconnect the user if loginToken cookie exists', () => {
        const cookies = new Cookies();
        const location = window.location;

        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        window.location = location;

        expect(window.location.replace).toBeCalledWith('/');
    });
});