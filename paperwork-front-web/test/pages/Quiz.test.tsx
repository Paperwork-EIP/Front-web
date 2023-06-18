import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Quiz from '../../src/pages/QuizPages/Quiz';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            href: jest.fn()
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    cookies.set('loginToken', 'test');
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Quiz Tests", () => {
    // test('should redirects to login page if loginToken cookie doesn\'t exist', () => {
    //   const fakeUser =
    //   {
    //     email: "testEmail",
    //     username: "testUsername",
    //     address: "testAddress",
    //     number_phone: "testPhoneNumber",
    //     language: "english",
    //     age: 20,
    //     profile_picture: "Avatars/Avatar05.png"
    //   };

    //   axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
    //   const useStateSpy = jest.spyOn(React, 'useState');
    //   useStateSpy.mockImplementation((init) => [init, jest.fn()]);
    //   const location = window.location;

    //   render(
    //       <BrowserRouter>
    //         <Quiz />
    //       </BrowserRouter>
    //   );

    //   cookies.remove('loginToken');
    //   window.location = location;
    //   expect(window.location.assign).toBeCalledWith('/');
    // });
    test('should render the page correctly', async () => {
        const fakeProcess = {
            response: [
                {
                    title: 'Title',
                    description: 'Description',
                    source: 'Source',
                    stocked_title: 'Stocked Title',
                },
            ],
        };

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeProcess });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const screen = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen).toBeDefined();
        });
    });
    test('renders the page title', async () => {
        const fakeProcess = {
            response: [
                {
                    title: 'Title',
                    description: 'Description',
                    source: 'Source',
                    stocked_title: 'Stocked Title',
                },
            ],
        };

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeProcess });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        await waitFor(() => {
            const pageTitle = getByTestId('quiz-title');
            expect(pageTitle).toBeInTheDocument();
        });
    });
    test('renders the question', async () => {
        const fakeProcess = {
            response: [
                {
                    title: 'Title',
                    description: 'Description',
                    source: 'Source',
                    stocked_title: 'Stocked Title',
                },
            ],
        };

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeProcess });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        await waitFor(() => {
            const question = getByTestId('quiz-question');
            expect(question).toBeInTheDocument();
        });
    });
    test('renders the quiz select with options', async () => {
        const fakeProcess = {
            response: [
                {
                    title: 'Title',
                    description: 'Description',
                    source: 'Source',
                    stocked_title: 'Stocked Title',
                },
            ],
        };

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeProcess });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(useStateSpy).toHaveBeenCalled();
            const option1 = getByTestId('select-option');
            expect(option1.textContent).toEqual(fakeProcess.response[0].title);
        });
    });
    test('redirects to the selected quiz on submit', async () => {
        const fakeProcess = {
            response: [
                {
                    title: 'Title',
                    description: 'Description',
                    source: 'Source',
                    stocked_title: 'Stocked Title',
                },
            ],
        };

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeProcess });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(useStateSpy).toHaveBeenCalled();
            const option1 = getByTestId('select-option');
            console.log('option1:', option1);
            console.log('option1 textContent:', option1.textContent);
            const quizSelect = getByTestId('select');
            fireEvent.change(quizSelect, { target: { value: 0 } });
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
            expect(window.location.href).toEqual('/quiz//0');
        });
    });
});