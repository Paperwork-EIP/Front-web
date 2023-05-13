import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import QuizQuestions from '../../src/pages/QuizPages/QuizQuestion';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            search: {
                substring: jest.fn()
            }
        }
    });
    jest.spyOn(console, 'log').mockImplementation();
    cookies.set('loginToken', 'test');
    global.alert = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({
        data: {
            questions: [
                { step_id: 1, question: 'Test Question 1' },
                { step_id: 2, question: 'Test Question 2' },
            ],
        },
    });
    axios.post = jest.fn().mockResolvedValue({});
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe("Quiz Questions Tests", () => {
    test("should display correct data", async () => {
        const { getByText } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(getByText('No')).toBeInTheDocument();
            expect(getByText('Yes')).toBeInTheDocument();
        });
    });
    test('redirects to home page if login token is not set', async () => {
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );

        expect(window.location.assign).toHaveBeenCalledWith('/');
    });
    test('handles button click and redirects to next question', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );

        fireEvent.click(getByText('Yes'));

        await waitFor(() => {
            expect(window.location.href).toEqual("/processResult/undefined");
        });
    });
    test('handles last question and redirects to result page', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );

        fireEvent.click(getByText('Yes'));
        fireEvent.click(getByText('No'));

        await waitFor(() => {
            expect(window.location.href).toBe(
                '/processResult/undefined'
            );
        });
    });
    test('should handle error if axios.post catch an error', async () => {
        const axiosSpy = jest.spyOn(axios, 'post').mockRejectedValue(new Error('Example error message'));
        
        const { getByText } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );
        
        fireEvent.click(getByText('Yes'));
        fireEvent.click(getByText('No'));

        expect(axiosSpy).toHaveBeenCalledTimes(2);
    });
});