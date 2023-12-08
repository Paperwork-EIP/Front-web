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
    // test('should display percentage of process', async () => {
    //     axios.get = jest.fn().mockResolvedValue({
    //         data: {
    //             key: 1,
    //             process: "testProcess",
    //             percentage: 50
    //         }
    //     });

    //     const { getByTestId } = render(
    //         <BrowserRouter>
    //             <HomePage />
    //         </BrowserRouter>
    //     );

    //     const percent = getByTestId(/percentageValue/i);

    //     await waitFor(() => {
    //         expect(percent).toBeTruthy();
    //     });
    // })
    // test('should set language', async () => {
    //     axios.get = jest.fn().mockResolvedValue({
    //         data: {
    //             language: "en"
    //         }
    //     });

    //     const screen = render(
    //         <BrowserRouter>
    //             <HomePage />
    //         </BrowserRouter>
    //     );

    //     await waitFor(() => {
    //         expect(screen).not.toBeNull();
    //         expect(axios.get).toHaveBeenCalled();
    //     });
    // })
    // test('should get calendar datas', async () => {
    //     axios.get = jest.fn().mockResolvedValue({
    //         data: {
    //             key: 1,
    //             date: "2021-05-05",
    //             process_title: "testProcess",
    //             step_title: "testStep",
    //             step_description: "testDescription",
    //         }
    //     });

    //     const screen = render(
    //         <BrowserRouter>
    //             <HomePage />
    //         </BrowserRouter>
    //     );

    //     await waitFor(() => {
    //         expect(screen).not.toBeNull();
    //         expect(axios.get).toHaveBeenCalled();
    //     });
    // })
});