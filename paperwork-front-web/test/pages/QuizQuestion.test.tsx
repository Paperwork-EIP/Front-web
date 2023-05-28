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
        const fakeUser =
        {
          email: "testEmail",
          username: "testUsername",
          address: "testAddress",
          number_phone: "testPhoneNumber",
          language: "english",
          age: 20,
          profile_picture: "Avatars/Avatar05.png"
        };
    
        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(getByTestId('btn-yes')).toBeInTheDocument();
            expect(getByTestId('btn-no')).toBeInTheDocument();
        });
    });
    // test('should redirects to login page if loginToken cookie doesn\'t exist', () => {
    //     const location = window.location;
    //     const fakeUser =
    //     {
    //         email: "testEmail",
    //         username: "testUsername",
    //         address: "testAddress",
    //         number_phone: "testPhoneNumber",
    //         language: "english",
    //         age: 20,
    //         profile_picture: "Avatars/Avatar05.png"
    //     };
    
    //     axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
    //     const useStateSpy = jest.spyOn(React, 'useState');
    //     useStateSpy.mockImplementation((init) => [init, jest.fn()]);

    //     render(
    //         <BrowserRouter>
    //             <QuizQuestions />
    //         </BrowserRouter>
    //     );

    //     window.location = location;
    //     expect(window.location.assign).toBeCalledWith('/');
    // });
    test('handles button click and redirects to next question', async () => {
        const fakeUser =
        {
          email: "testEmail",
          username: "testUsername",
          address: "testAddress",
          number_phone: "testPhoneNumber",
          language: "english",
          age: 20,
          profile_picture: "Avatars/Avatar05.png"
        };
    
        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        
        const { getByTestId } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );
        
        fireEvent.click(getByTestId('btn-yes'));

        await waitFor(() => {
            expect(window.location.href).toEqual("/processResult/undefined");
        });
    });
    test('handles last question and redirects to result page', async () => {
        const fakeUser =
        {
          email: "testEmail",
          username: "testUsername",
          address: "testAddress",
          number_phone: "testPhoneNumber",
          language: "english",
          age: 20,
          profile_picture: "Avatars/Avatar05.png"
        };
    
        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        
        const { getByTestId } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );
        
        fireEvent.click(getByTestId('btn-yes'));
        fireEvent.click(getByTestId('btn-no'));

        await waitFor(() => {
            expect(window.location.href).toBe(
                '/processResult/undefined'
            );
        });
    });
    test('should handle error if axios.post catch an error', async () => {
        const fakeUser =
        {
          email: "testEmail",
          username: "testUsername",
          address: "testAddress",
          number_phone: "testPhoneNumber",
          language: "english",
          age: 20,
          profile_picture: "Avatars/Avatar05.png"
        };
    
        axios.get = jest.fn().mockResolvedValue({ status:200, data: fakeUser});
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const axiosSpy = jest.spyOn(axios, 'post').mockRejectedValue(new Error('Example error message'));
        
        const { getByTestId } = render(
            <BrowserRouter>
                <QuizQuestions />
            </BrowserRouter>
        );
        
        fireEvent.click(getByTestId('btn-yes'));
        fireEvent.click(getByTestId('btn-no'));

        expect(axiosSpy).toHaveBeenCalledTimes(2);
    });  
});
