import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Register from '../../src/pages/Register';

jest.mock('axios');
jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    global.alert = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Register Tests', () => {
    test('submits the form with valid data when submit button is clicked', async () => {
        const location = window.location;
        const cookies = new Cookies();

        cookies.set = jest.fn().mockImplementationOnce(() => { });

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const email = fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        const username = fireEvent.change(getByTestId(/username/i), { target: { value: 'testuser' } });
        const password = fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        const confirmPassword = fireEvent.change(getByTestId(/confirmPassword/i), { target: { value: 'testpassword' } });
        const register = fireEvent.click(getByLabelText(/button-register/i));

        expect(email).toBeTruthy();
        expect(username).toBeTruthy();
        expect(password).toBeTruthy();
        expect(confirmPassword).toBeTruthy();
        expect(register).toBeTruthy();

        window.location = location;
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
    test('should display alert and not submits the form with invalid data when submit button is clicked', async () => {
        axios.post = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(getByTestId(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        fireEvent.change(getByTestId(/confirmPassword/i), { target: { value: 'testpassword' } });
        fireEvent.click(getByLabelText(/button-register/i));

        expect(axios.post).toHaveBeenCalled();
    });
    test('enables submit button when required fields are not empty', async () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(getByTestId(/email/i)).toHaveAttribute('required');
        expect(getByTestId(/username/i)).toHaveAttribute('required');
        expect(getByTestId(/password/)).toHaveAttribute('required');
        expect(getByTestId(/confirmPassword/i)).toHaveAttribute('required');

        const submitButton = getByLabelText(/button-register/i);

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(getByTestId(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        fireEvent.change(getByTestId(/confirmPassword/i), { target: { value: 'testpassword' } });

        expect(submitButton).not.toHaveClass('disabled');
        expect(submitButton).not.toHaveAttribute('disabled');
    });
    test('enables submit button when required fields are not empty', async () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(getByTestId(/email/i)).toHaveAttribute('required');
        expect(getByTestId(/username/i)).toHaveAttribute('required');
        expect(getByTestId(/password/)).toHaveAttribute('required');
        expect(getByTestId(/confirmPassword/i)).toHaveAttribute('required');

        const submitButton = getByLabelText(/button-register/i);

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(getByTestId(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        fireEvent.change(getByTestId(/confirmPassword/i), { target: { value: 'testpassword' } });

        expect(submitButton).not.toHaveClass('disabled');
        expect(submitButton).not.toHaveAttribute('disabled');
    });
    test('disables submit button when required fields are empty', async () => {
        const { getByTestId, getByLabelText } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(getByTestId(/email/i)).toHaveAttribute('required');
        expect(getByTestId(/username/i)).toHaveAttribute('required');
        expect(getByTestId(/password/)).toHaveAttribute('required');
        expect(getByTestId(/confirmPassword/i)).toHaveAttribute('required');
        expect(getByTestId(/email/i)).toHaveValue('');
        expect(getByTestId(/username/i)).toHaveValue('');
        expect(getByTestId(/password/)).toHaveValue('');
        expect(getByTestId(/confirmPassword/i)).toHaveValue('');

        const submitButton = getByLabelText(/button-register/i);
        expect(submitButton).toHaveAttribute('disabled');

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        expect(submitButton).toHaveAttribute('disabled');

        fireEvent.change(getByTestId(/username/i), { target: { value: 'testuser' } });
        expect(submitButton).toHaveAttribute('disabled');

        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        expect(submitButton).toHaveAttribute('disabled');

        fireEvent.change(getByTestId(/confirmPassword/i), { target: { value: 'qhertdngfh' } });
        expect(submitButton).toHaveAttribute('disabled');
        expect(submitButton).toHaveClass('disabled');
    });
    test('clicking on google connect button calls googleConnect function', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const googleButton = getByTestId('google-link');

        fireEvent.click(googleButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('clicking on facebook connect button calls facebookConnect function', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const facebookButton = getByTestId('facebook-link');

        fireEvent.click(facebookButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('should link to the login page when start button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-login');
        expect(linkElement).toHaveAttribute('href', '/login');

    });
    test('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <Register />
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
                <Register />
            </BrowserRouter>
        );

        cookies.remove('loginToken');
        window.location = location;

        expect(window.location.replace).toBeCalledWith('/home');
    });
});
