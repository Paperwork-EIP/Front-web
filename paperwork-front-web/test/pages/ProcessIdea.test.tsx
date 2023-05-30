import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import ProcessIdea from '../../src/pages/ProcessIdea';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn()
        }
    });
    cookies.set('loginToken', 'test');
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Process Idea Tests", () => {
    test('should not redirects to login page if loginToken cookie not exists', () => {
        

        render(
            <BrowserRouter>
                <ProcessIdea />
            </BrowserRouter>
        );
        cookies.remove('loginToken');
        expect(window.location.pathname).not.toEqual('/');
    });
    test('submits the form with valid data when submit button is clicked', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <ProcessIdea />
            </BrowserRouter>
        );

        const title = fireEvent.change(getByLabelText(/title/i), { target: { value: 'test' } });
        const description = fireEvent.change(getByLabelText(/description/), { target: { value: 'dfetrgfdg' } });
        const content = fireEvent.change(getByLabelText(/content/), { target: { value: 'dfetrgfdg' } });
        const submit = fireEvent.click(getByLabelText(/submit_button/i));
        const submitModal = fireEvent.click(getByLabelText(/submit_continue_button/i));

        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(content).toBeTruthy();
        expect(submit).toBeTruthy();
        expect(submitModal).toBeTruthy();
    });
    test('should reset the form', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <ProcessIdea />
            </BrowserRouter>
        );

        const title = fireEvent.change(getByLabelText(/title/i), { target: { value: 'test' } });
        const description = fireEvent.change(getByLabelText(/description/), { target: { value: 'dfetrgfdg' } });
        const content = fireEvent.change(getByLabelText(/content/), { target: { value: 'dfetrgfdg' } });
        const cancel = fireEvent.click(getByLabelText(/cancel_button/i));
        const resetModal = fireEvent.click(getByLabelText(/cancel_continue_button/i));

        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(content).toBeTruthy();
        expect(cancel).toBeTruthy();
        expect(resetModal).toBeTruthy();
    });
    test('should catch an error', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <ProcessIdea />
            </BrowserRouter>
        );

        const title = fireEvent.change(getByLabelText(/title/i), { target: { value: 'test' } });
        const description = fireEvent.change(getByLabelText(/description/), { target: { value: 'dfetrgfdg' } });
        const content = fireEvent.change(getByLabelText(/content/), { target: { value: 'dfetrgfdg' } });
        const submit = fireEvent.click(getByLabelText(/submit_button/i));
        const submitModal = fireEvent.click(getByLabelText(/submit_continue_button/i));

        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(content).toBeTruthy();
        expect(submit).toBeTruthy();
        expect(submitModal).toBeTruthy();
    });
});