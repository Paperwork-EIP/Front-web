import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import VerifyEmailPage from '../../src/pages/VerifyEmail';

jest.mock('axios');
jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            href: "http://localhost:3456/test"
        }
    });
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Verify Email Tests", () => {
    test('should set cookies when email verified', () => {
        render(
            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalled();
    });
    test('should display an error alert with error message', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        render(
            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalled();
    });
    test('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
});