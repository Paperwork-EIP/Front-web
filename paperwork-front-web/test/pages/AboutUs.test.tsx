import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import axios from 'axios';

import AboutUs from '../../src/pages/AboutUs';

jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    mockAllIsIntersecting(true);
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('About Us Tests', () => {
    test('should render the page correctly', () => {
        const screen = render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        );

        expect(screen).toBeDefined();
    });
    test('submits the form with valid data when submit button is clicked', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        );

        const name = fireEvent.change(getByTestId(/name/i), { target: { value: 'test@test.com' } });
        const email = fireEvent.change(getByTestId(/email/), { target: { value: 'name' } });
        const text = fireEvent.change(getByTestId(/text/), { target: { value: 'Random test' } });
        const login = fireEvent.click(getByLabelText(/button-send/i));

        expect(name).toBeTruthy();
        expect(email).toBeTruthy();
        expect(text).toBeTruthy();
        expect(login).toBeTruthy();
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
    test('should return an error', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        );

        const name = fireEvent.change(getByTestId(/name/i), { target: { value: 'test@test.com' } });
        const email = fireEvent.change(getByTestId(/email/), { target: { value: 'name' } });
        const text = fireEvent.change(getByTestId(/text/), { target: { value: 'Random test' } });
        const login = fireEvent.click(getByLabelText(/button-send/i));

        expect(name).toBeTruthy();
        expect(email).toBeTruthy();
        expect(text).toBeTruthy();
        expect(login).toBeTruthy();
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});