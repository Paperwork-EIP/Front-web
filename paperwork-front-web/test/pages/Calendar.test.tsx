import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Calendar from '../../src/pages/Calendar';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();
const mockResponse = {
    data: {
      appoinment: [
        {
          date: '2023-05-14',
          process_title: 'Process Title',
          step_title: 'Step Title',
          step_description: 'Step Description',
          user_process_id: 123,
          step_id: 456,
        },
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
    axios.post = jest.fn().mockResolvedValue(mockResponse);
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe("Calendar Tests", () => {
    test('should display the page correctly', () => {
        cookies.get("loginToken");
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        render(
            <BrowserRouter>
                <Calendar />
            </BrowserRouter>
        );

        expect(axios.get).toBeCalled();
        expect(useStateSpy).toHaveBeenCalled();
    });
    test('should submit an event', () => {
        cookies.get("loginToken");

        const { getByLabelText} = render(
            <BrowserRouter>
                <Calendar />
            </BrowserRouter>
        );

        const open = fireEvent.click(getByLabelText(/add_an_event_button/i));
        const newDate = fireEvent.change(getByLabelText(/input-new-date-change/i), { target: { value: '2023-05-14' } });
        const submit = fireEvent.click(getByLabelText(/add_submit_button/i));

        expect(open).toBeTruthy();
        expect(newDate).toBeTruthy();
        expect(submit).toBeTruthy();
    });
    test('should display an error alert with error message', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));
        cookies.get("loginToken");

        render(
            <BrowserRouter>
                <Calendar />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalled();
    });
    test('should not redirects to login page if loginToken cookie not exists', () => {
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <Calendar />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
});