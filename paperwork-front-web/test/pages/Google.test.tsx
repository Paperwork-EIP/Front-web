import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import axios from 'axios';

import Google from '../../src/pages/Google';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn(),
            assign: jest.fn(),
            href: "http://localhost:3456/test"
        }
    });
    axios.get = jest.fn().mockResolvedValue({ data: { jwt: "token123", email: "test@test.com" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Google Tests", () => {
    test('should render correctly Google page login', () => {
        useLocation.mockReturnValueOnce({
            search: '?code=test-code',
        });

        render(
            <BrowserRouter>
                <Google />
            </BrowserRouter>
        );

        expect(axios.get).toBeCalled();
    });
    test('should redirect to /', () => {
        useLocation.mockReturnValue({
            search: '?test=',
        });

        render(
            <BrowserRouter>
                <Google />
            </BrowserRouter>
        );

        expect(axios.get).not.toBeCalled();
    });
});