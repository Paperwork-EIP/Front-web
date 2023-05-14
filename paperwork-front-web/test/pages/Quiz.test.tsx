import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Quiz from '../../src/pages/QuizPages/Quiz';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            href: jest.fn()
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

describe("Quiz Tests", () => {
    test('should redirects to login page if loginToken cookie not exist', () => {
        const cookies = new Cookies();
        const location = window.location;
        cookies.remove('loginToken');
    
        render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
    
        window.location = location;
    
        expect(window.location.assign).toBeCalledWith('/');
    });
    test('renders the page title', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
        const pageTitle = getByText('New Process Quiz');
        expect(pageTitle).toBeInTheDocument();
    });
    test('renders the question', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
        const question = getByText('What type of procedure do you want to complete ?');
        expect(question).toBeInTheDocument();
    });
    test('renders the quiz select with options', async () => {
        const cookies = new Cookies();
        cookies.set('loginToken', { token: 'token123' });
        const fakeProcess =
        {
            response: [
                {
                    title: 'Procedure 1',
                    source: 'Source 1',
                }
            ]
        };

        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeProcess});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
        cookies.remove('loginToken');

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(useStateSpy).toHaveBeenCalled();
            const option1 = getByTestId('select-option');
            expect(option1.textContent).toEqual(fakeProcess.response[0].title);
        });
    });
    test('redirects to the selected quiz on submit', async () => {
        const cookies = new Cookies();
        cookies.set('loginToken', { token: 'token123' });
        const fakeProcess =
        {
            response: [
                {
                    title: 'Procedure 1',
                    source: 'Source 1',
                }
            ]
        };

        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeProcess});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
        cookies.remove('loginToken');

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(useStateSpy).toHaveBeenCalled();
            const option1 = getByTestId('select-option');
            expect(option1.textContent).toEqual(fakeProcess.response[0].title);
            const quizSelect = getByTestId('select');
            fireEvent.change(quizSelect, { target: { value: 0 } });
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
            expect(window.location.href).toEqual('/quiz//0');
        });
    });
});