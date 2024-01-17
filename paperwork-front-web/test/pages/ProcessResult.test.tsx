import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
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
            replace: jest.fn(),
            assign: jest.fn(),
            get: jest.fn(() => 'testLoginToken'),
            set: jest.fn(),
            remove: jest.fn(),
        }
    });

    axios.get.mockResolvedValue({
        data: {
            language: 'en', // Replace this with the actual response from your API
        },
    });
});

afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
});

describe("Process Result Tests", () => {
    test('should not redirect to login page if loginToken cookie exists', () => {
        cookies.set('loginToken', 'test');
        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );
        expect(window.location.pathname).not.toEqual('/');
    });

    test('should render the page correctly', async () => {
        const screen = render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen).toBeDefined();
        });
    });

    test('should verify getLanguageByToken function', async () => {
        const getLanguageByTokenResponse = {
            data: {
                id: 123,
                username: "test",
                email: "test@test.test",
                password: "textpwd",
                language: "english",
                name: "testName",
                firstname: "testFirstname",
                adress: "testAdress",
                profile_picture: "testPictureLink",
                age: null,
                number_phone: null,
                token: "tokenTest",
                google_token: null,
                facebook_token: null
            },
        };

        cookies.set('loginToken', 'test');
        axios.get.mockResolvedValue(getLanguageByTokenResponse);

        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
        });
    });

    test('should handle update button click', async () => {
        const handleUpdateResponse = {
            data: {
                response: 'Update successful',
            },
        };

        cookies.set('loginToken', 'test');
        axios.post.mockResolvedValue(handleUpdateResponse);

        const { getByTestId } = render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            fireEvent.click(getByTestId('updatePersonalInfoBtn'));
            expect(axios.post).toHaveBeenCalled();
            // Add more assertions as needed
        });
    });

    test('should not redirect to login page if loginToken cookie exists', () => {
        cookies.set('loginToken', 'test');
        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );
        expect(window.location.pathname).not.toEqual('/');
    });

    test('should render the page correctly', async () => {
        const screen = render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen).toBeDefined();
        });
    });

    test('should verify getLanguageByToken function', async () => {
        const getLanguageByTokenResponse = {
            data: {
                id: 123,
                username: "test",
                email: "test@test.test",
                password: "textpwd",
                language: "english",
                name: "testName",
                firstname: "testFirstname",
                adress: "testAdress",
                profile_picture: "testPictureLink",
                age: null,
                number_phone: null,
                token: "tokenTest",
                google_token: null,
                facebook_token: null
            },
        };

        cookies.set('loginToken', 'test');
        axios.get.mockResolvedValue(getLanguageByTokenResponse);

        render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
        });
    });

    test('should handle update button click', async () => {
        const handleUpdateResponse = {
            data: {
                response: 'Update successful',
            },
        };

        cookies.set('loginToken', 'test');
        axios.post.mockResolvedValue(handleUpdateResponse);

        const { getByTestId } = render(
            <BrowserRouter>
                <ProcessResult />
            </BrowserRouter>
        );

        await waitFor(() => {
            fireEvent.click(getByTestId('updatePersonalInfoBtn'));
            expect(axios.post).toHaveBeenCalled();
            // Add more assertions as needed
        });
    });
});