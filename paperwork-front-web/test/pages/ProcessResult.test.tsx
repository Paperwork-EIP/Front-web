import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import ProcessResult from '../../src/pages/ProcessResult';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();
const mockResponse = {
    data: {
        response: [
            { id: 1, step_description: 'Step 1', is_done: false },
            { id: 2, step_description: 'Step 2', is_done: true },
            { id: 3, step_description: 'Step 3', is_done: false },
        ],
    },
};

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn()
        }
    });

    cookies.set('loginToken', 'test');
    axios.get = jest.fn().mockResolvedValue(mockResponse);
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe("Process Result Tests", () => {
    test('should display correctly the page', () => {
        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
    test('should redirects to welcome page if loginToken cookie not exists', () => {
        cookies.remove("loginToken");

        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        expect(window.location.assign).toHaveBeenCalledTimes(1);
    });
    test('should get data', async () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { container } = render(
          <BrowserRouter>
            <ProcessResult />
          </BrowserRouter>
        );

        await waitFor(() => {
            const checkbox = container.querySelector('input[type="checkbox"]')!;

            const click = fireEvent.click(checkbox);

            expect(axios.get).toBeCalled();
            expect(useStateSpy).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(click).toBeTruthy();
        })
    });
    test('should get an error from axios get', () => {
        axios.get = jest.fn().mockRejectedValue(new Error("Error"));

        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalledTimes(1);
    });
    test('should get an error from axios post', async () => {
        axios.post = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { container } = render(
          <BrowserRouter>
            <ProcessResult />
          </BrowserRouter>
        );
      
        await waitFor(() => {
          const checkbox = container.querySelector('input[type="checkbox"]')!;
      
          fireEvent.click(checkbox);
      
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(useStateSpy).toHaveBeenCalled();
          expect(checkbox).toBeInTheDocument();
        });
      });
});