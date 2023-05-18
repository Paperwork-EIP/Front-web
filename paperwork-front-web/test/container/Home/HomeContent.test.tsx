import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Bg from '../../../src/container/Home/HomeContent';

jest.mock('axios');
jest.mock('../../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            href: "http://localhost:3456/test"
        }
    });
    cookies.set('loginToken', 'test');
    axios.get = jest.fn().mockResolvedValue({
        data:
        {
            response:
                [
                    {
                        pourcentage: 50,
                        userProcess:
                        {
                            process_title: "example"
                        }
                    },
                    {
                        pourcentage: 0,
                        userProcess:
                        {
                            process_title: "example"
                        }
                    },
                    {
                        userProcess:
                        {
                            process_title: "example"
                        }
                    }
                ],
            appoinment:
                [
                    {
                        date: "123",
                        step_title: "title",
                        step_description: "description"
                    },
                    {
                        date: "234",
                        step_title: "23245",
                        step_description: "345346"
                    },
                ]
        }
    });
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe("Reset Password Tests", () => {
    test('should render the page correctly', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error("Error"));

        render(
            <BrowserRouter>
                <Bg />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2);
        })
    });
    test("should get data", async () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
    
        render(
            <BrowserRouter>
                <Bg />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(useStateSpy).toHaveBeenCalled();
            expect(axios.get).toHaveBeenCalled();
        })
    });
    test('should handle clicks', async () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Bg />
            </BrowserRouter>
        );

        const click1 = fireEvent.click(getByLabelText(/click-alp/i));
        const click2 = fireEvent.click(getByLabelText(/click-asc/i));

        expect(click1).toBeTruthy();
        expect(click2).toBeTruthy();
    });
});