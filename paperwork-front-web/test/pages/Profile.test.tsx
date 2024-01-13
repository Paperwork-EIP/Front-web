import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Profile from '../../src/pages/Profile';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn().mockImplementation(() => Promise.resolve()),
            replace: jest.fn().mockImplementation(() => Promise.resolve())
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    cookies.set('loginToken', { token: 'token123' });
    axios.get = jest.fn().mockImplementation(() => Promise.resolve());
    axios.post = jest.fn().mockImplementation(() => Promise.resolve());
    
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, jest.fn()]);
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Profile Tests', () => {
    it('should render the page correctly', () => {
        const screen = render(<Router><Profile /></Router>);

        expect(screen).toBeDefined();
    });
    test('Axios.get used in the use effect to have user\'s datas.', () => {
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        cookies.remove('loginToken');

        expect(axios.get).toHaveBeenCalled();
    });
    test('Should display user\'s datas', async () => {
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

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: fakeUser });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        cookies.remove('loginToken');

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(useStateSpy).toHaveBeenCalled();
            const emailElement = getByTestId('email');
            expect(emailElement.textContent).toEqual(fakeUser.email);
            const usernameElement = getByTestId('username');
            expect(usernameElement.textContent).toEqual(fakeUser.username);
            const addressElement = getByTestId('address');
            expect(addressElement.textContent).toEqual(fakeUser.address);
            const phonenumberElement = getByTestId('number_phone');
            expect(phonenumberElement.textContent).toEqual(fakeUser.number_phone);
            const languageElement = getByTestId('language');
            expect(languageElement.textContent).toEqual(fakeUser.language);
            const ageElement = getByTestId('age');
            expect(ageElement.textContent).toEqual(fakeUser.age.toString());
            const profilePictureElement = getByTestId('profilePicture');
            expect(profilePictureElement).toHaveAttribute('src', fakeUser.profile_picture);
        });
    });
    test('Should display a button when userProcessInfo not null.', async () => {
        const fakeProcess = [
            {
                pourcentage: 33,
                userProcess: {
                    description: 'desc',
                    id: 1,
                    is_done: true,
                    process_id: 1,
                    source: "source",
                    stocked_title: "stockedTitle",
                    title: "title",
                }
            }
        ];

        axios.get = jest.fn().mockResolvedValue({ status: 200, data: { response: fakeProcess } });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);
        const { getByTestId } = render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        cookies.remove('loginToken');

        await waitFor(() => {
            expect(useStateSpy).toHaveBeenCalled();
            const button = getByTestId('Process-Btn');
            expect(button).not.toBeNull();
            fireEvent.click(button);
            expect(window.location.href).toEqual('processResult/' + fakeProcess[0].userProcess.stocked_title);
        });
    });
});