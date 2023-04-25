import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import HomePage from '../../src/pages/Home';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);
jest.mock('../../src/container/Home/HomeContent', () => () => <></>);

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

describe("Home Page Tests", () => {
    test('should redirects to welcome page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(window.location.replace).toBeCalledWith('/');
    });
});