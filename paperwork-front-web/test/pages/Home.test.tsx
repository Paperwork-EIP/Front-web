import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { toast } from 'react-toastify';

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

describe("Home Page Tests", () => {
    test('should render home page correctly', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
    });
});