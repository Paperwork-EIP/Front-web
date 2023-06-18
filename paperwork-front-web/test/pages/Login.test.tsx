import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Login from '../../src/pages/Login';

jest.mock('axios');
jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Login Tests', () => {
    test('submits the form with valid data when submit button is clicked', async () => {
        const location = window.location;
        const cookies = new Cookies();

        cookies.set = jest.fn().mockImplementationOnce(() => { });

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

        window.location = location;
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
    test('should display alert and not submits the form with invalid data when submit button is clicked', async () => {
        axios.post = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        fireEvent.click(getByLabelText(/button-login/i));

        expect(axios.post).toHaveBeenCalled();
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
    test('should link to the register page when register button clicked', () => {
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
