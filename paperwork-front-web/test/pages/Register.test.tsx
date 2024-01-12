import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import axios from 'axios';

import RegisterPage from '../../src/pages/Register';

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

describe('Register Tests', () => {
    test('submit the form with valid data when submit button is clicked', async () => {
        const location = window.location;
        const cookies = new Cookies();

        cookies.set = jest.fn().mockImplementationOnce(() => { });

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        const email = fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        const username = fireEvent.change(getByTestId(/username/), { target: { value: 'testpassword' } });
        const password = fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        const confirmPassword = fireEvent.change(getByTestId(/confirmPassword/), { target: { value: 'testpassword' } });
        const Register = fireEvent.click(getByLabelText(/button-register/i));

        expect(email).toBeTruthy();
        expect(password).toBeTruthy();
        expect(username).toBeTruthy();
        expect(confirmPassword).toBeTruthy();
        expect(Register).toBeTruthy();

        window.location = location;
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
    test('should not submit the form with valid data when submit button is clicked', async () => {
        const location = window.location;
        const cookies = new Cookies();

        cookies.set = jest.fn().mockImplementationOnce(() => { });

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        const email = fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        const username = fireEvent.change(getByTestId(/username/), { target: { value: 'testpassword' } });
        const password = fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        const confirmPassword = fireEvent.change(getByTestId(/confirmPassword/), { target: { value: 'notsame' } });
        const Register = fireEvent.click(getByLabelText(/button-register/i));

        expect(email).toBeTruthy();
        expect(password).toBeTruthy();
        expect(username).toBeTruthy();
        expect(confirmPassword).toBeTruthy();
        expect(Register).toBeTruthy();

        window.location = location;
        expect(axios.post).toHaveBeenCalledTimes(0);
    });
    
    test('should not submit the form with invalid email format when submit button is clicked', async () => {
        const location = window.location;
        const cookies = new Cookies();

        cookies.set = jest.fn().mockImplementationOnce(() => { });

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        const email = fireEvent.change(getByTestId(/email/i), { target: { value: 'test' } });
        const username = fireEvent.change(getByTestId(/username/), { target: { value: 'testpassword' } });
        const password = fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        const confirmPassword = fireEvent.change(getByTestId(/confirmPassword/), { target: { value: 'notsame' } });
        const Register = fireEvent.click(getByLabelText(/button-register/i));

        expect(email).toBeTruthy();
        expect(password).toBeTruthy();
        expect(username).toBeTruthy();
        expect(confirmPassword).toBeTruthy();
        expect(Register).toBeTruthy();

        window.location = location;
        expect(axios.post).toHaveBeenCalledTimes(0);
    });
    test('should display alert and not submits the form with invalid data when submit button is clicked', async () => {
        axios.post = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(getByTestId(/username/), { target: { value: 'testpassword' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'testpassword' } });
        fireEvent.change(getByTestId(/confirmPassword/), { target: { value: 'testpassword' } });
        fireEvent.click(getByLabelText(/button-Register/i));

        expect(axios.post).toHaveBeenCalled();
    });
    test('clicking on google connect button calls googleConnect function', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );
        const googleButton = getByTestId('google-link');

        fireEvent.click(googleButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('should not login with Google', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));
        const { getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );
        const googleButton = getByTestId('google-link');

        fireEvent.click(googleButton);
        expect(axios.get).toHaveBeenCalled();
    });
    test('should link to the login page when register button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-login');
        expect(linkElement).toHaveAttribute('href', '/login');
    });
    test('should not redirects to Register page if RegisterToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('RegisterToken');

        render(
            <BrowserRouter>
                <RegisterPage />
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
                <RegisterPage />
            </BrowserRouter>
        );

        cookies.remove('loginToken');
        window.location = location;

        expect(window.location.replace).toBeCalledWith('/home');
    });
});
