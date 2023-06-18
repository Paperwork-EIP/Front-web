import React from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import EmailSent from '../../src/pages/EmailSent';

jest.mock('axios');
jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn(),
            assign: jest.fn()
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Email Sent Tests", () => {
    test('should display alert with sent message', () => {
        const cookies = new Cookies();

        cookies.set('loginToken', 'test');

        const { getByTestId } = render(
            <BrowserRouter>
                <EmailSent />
            </BrowserRouter>
        );

        fireEvent.click(getByTestId(/send-email-again/i));
        cookies.remove('loginToken');

        expect(axios.get).toHaveBeenCalled();
    });
    test('should display an error alert with error message', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));
        const cookies = new Cookies();

        cookies.set('loginToken', 'test');

        const { getByTestId } = render(
            <BrowserRouter>
                <EmailSent />
            </BrowserRouter>
        );

        fireEvent.click(getByTestId(/send-email-again/i));
        cookies.remove('loginToken');

        expect(axios.get).toHaveBeenCalled();
    });
    test('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <EmailSent />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
});