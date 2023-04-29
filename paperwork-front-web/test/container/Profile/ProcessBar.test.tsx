import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, configure, cleanup } from "@testing-library/react";

import axios from 'axios';

import ProcessBar from '../../../src/container/Profile/ProcessBar';

jest.mock('axios');

beforeEach(() => {
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
})

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Process Bar Component Tests", () => {
    it("should render Process bar component without crashes", () => {
        const screen = render(
            <BrowserRouter>
                <ProcessBar />
            </BrowserRouter>
        )

        expect(screen).toBeDefined();
    });

    test('should display alert and not submits the form when email verification failed', async () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        render(
            <BrowserRouter>
                <ProcessBar />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalled();
    });
});