import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, act, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Login from '../../src/pages/Login';

jest.mock('axios');

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    global.alert = jest.fn();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.get.mockResolvedValueOnce('mockResponse');
    axios.post.mockResolvedValueOnce('mockResponse');
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Login Tests', () => {
    test('submits the form with valid data when submit button is clicked', async () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const email = fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        const password = fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        const login = fireEvent.click(getByLabelText(/button-login/i));

        expect(email).toBeTruthy();
        expect(password).toBeTruthy();
        expect(login).toBeTruthy();
    });
    test('clicking on google connect button calls googleConnect function', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const googleButton = getByTestId('google-link');

        fireEvent.click(googleButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('clicking on facebook connect button calls facebookConnect function', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const facebookButton = getByTestId('facebook-link');

        fireEvent.click(facebookButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('should link to the login page when start button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-register');
        expect(linkElement).toHaveAttribute('href', '/register');

    });
    test('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/home');
    });
    test('should redirects to home page if loginToken cookie exists', () => {
        const cookies = new Cookies();
        const location = window.location;

        cookies.set('loginToken', 'test');

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        cookies.remove('loginToken');
        window.location = location;

        expect(window.location.replace).toBeCalledWith('/home');
    });
});
