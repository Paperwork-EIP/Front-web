import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import axios from 'axios';

import Facebook from '../../src/pages/Facebook';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
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
                <Facebook />
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
                <Facebook />
            </BrowserRouter>
        );

        expect(axios.get).not.toBeCalled();
    });
});