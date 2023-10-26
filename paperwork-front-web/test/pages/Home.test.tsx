import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import axios from 'axios';

import HomePage from '../../src/pages/Home';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

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
    test('should render the page correctly', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error("Error"));

        const screen = render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen).not.toBeNull();
        });
    });
    test("should get data", async () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled;
        })
    });
    test('should handle clicks', async () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const click1 = fireEvent.click(getByLabelText(/click-alp/i));
        const click2 = fireEvent.click(getByLabelText(/click-asc/i));

        expect(click1).toBeTruthy();
        expect(click2).toBeTruthy();
    });
});