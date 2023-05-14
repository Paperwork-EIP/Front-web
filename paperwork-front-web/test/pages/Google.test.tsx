import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import ResetPassword from '../../src/pages/ResetPassword';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

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

describe("Google Tests", () => {
    test('should not redirects to login page if loginToken cookie not exists', () => {
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
});