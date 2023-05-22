import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Profile from '../../src/pages/Profile';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn().mockImplementation(() => Promise.resolve()),
            replace: jest.fn().mockImplementation(() => Promise.resolve())
        }
    });
    global.alert = jest.fn();
    axios.get = jest.fn().mockImplementation(() => Promise.resolve());
    axios.post = jest.fn().mockImplementation(() => Promise.resolve());
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Profile Tests', () => {
  test('should redirects to login page if loginToken cookie doesn\'t exist', () => {
    const cookies = new Cookies();
    const location = window.location;
    cookies.remove('loginToken');

    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    window.location = location;

    expect(window.location.assign).toBeCalledWith('/');
  });
  it('should render the page correctly', () => {
    const screen = render(<Router><Profile /></Router>);
    
    expect(screen).toBeDefined();
  });
  it('should link to the modify profile page when about button clicked', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    const linkElement = getByTestId('modify-profile-btn');
    expect(linkElement).toHaveAttribute('href', '/settings');
  });
  test('Axios.get used in the use effect to have user\'s datas.', () => {
    const cookies = new Cookies();
    cookies.set('loginToken', { token: 'token123' });

    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );
    cookies.remove('loginToken');

    expect(axios.get).toHaveBeenCalled();
  });
  test('Should display user\'s datas', async () => {
    const cookies = new Cookies();
    cookies.set('loginToken', { token: 'token123' });
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
    const cookies = new Cookies();
    cookies.set('loginToken', { token: 'token123' });
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

    axios.get = jest.fn().mockResolvedValue({ status: 200,  data: { response: fakeProcess }});
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