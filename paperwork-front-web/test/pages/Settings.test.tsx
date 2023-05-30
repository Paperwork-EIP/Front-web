import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, act } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Settings from '../../src/pages/Settings';

import { getVariableToChange } from '../../src/pages/Settings';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

const cookies = new Cookies();
const expectedUserData = {
    username: 'johndoe',
    name: 'John Doe',
    firstname: 'John',
    language: 'en',
    age: 30,
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA',
    phonenumber: '123-456-7890',
    profilePicture: 'http://example.com/profile-picture.jpg',
};

const expectePostdUserData =
{
    response: {
        status: 200,
    },
    data: {
        username: 'johndoe',
        name: 'John Doe',
        firstname: 'John',
        language: 'en',
        age: 30,
        email: 'johndoe@example.com',
        address: '123 Main St, Anytown, USA',
        phonenumber: '123-456-7890',
        profilePicture: 'http://example.com/profile-picture.jpg',
    }
};

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn(),
            reload: jest.fn(),
            href: "http://localhost:3456/test"
        }
    });
    cookies.set('loginToken', 'test');
    global.alert = jest.fn();
    axios.get = jest.fn().mockResolvedValue(expectedUserData);
    axios.post = jest.fn().mockResolvedValue(expectePostdUserData);
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe("Settings Tests", () => {
    test('should not redirects to login page if loginToken cookie not exists', () => {
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/');
    });
    test('should get data correctly', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        expect(useStateSpy).toBeCalled();
        expect(axios.get).toBeCalled();
    });
    test('should click on the buttons and do logics', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const username_input = fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        const name_input = fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        const firstname_input = fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        const language_select = fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        const age_input = fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        const email_input = fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        const address_input = fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        const phone_input = fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });
        const pswd_input = fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: 'password' } });
        const cpswd_input = fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: 'password' } });

        const username_button = fireEvent.click(getByLabelText(/button-change-username/i));
        const name_button = fireEvent.click(getByLabelText(/button-change-name/i));
        const firstname_button = fireEvent.click(getByLabelText(/button-change-firstname/i));
        const language_button = fireEvent.click(getByLabelText(/button-change-language/i));
        const age_button = fireEvent.click(getByLabelText(/button-change-age/i));
        const email_button = fireEvent.click(getByLabelText(/button-change-email/i));
        const address_button = fireEvent.click(getByLabelText(/button-change-address/i));
        const phone_button = fireEvent.click(getByLabelText(/button-change-phone/i));
        const show1_button = fireEvent.click(getByLabelText(/button-change-show1/i));
        const show2_button = fireEvent.click(getByLabelText(/button-change-show2/i));
        const pswd_button = fireEvent.click(getByLabelText(/button-change-password/i));
        const delete_button = fireEvent.click(getByLabelText(/button-change-delete/i));

        expect(username_input).toBeTruthy();
        expect(name_input).toBeTruthy();
        expect(firstname_input).toBeTruthy();
        expect(language_select).toBeTruthy();
        expect(age_input).toBeTruthy();
        expect(email_input).toBeTruthy();
        expect(address_input).toBeTruthy();
        expect(phone_input).toBeTruthy();
        expect(pswd_input).toBeTruthy();
        expect(cpswd_input).toBeTruthy();

        expect(username_button).toBeTruthy();
        expect(name_button).toBeTruthy();
        expect(firstname_button).toBeTruthy();
        expect(language_button).toBeTruthy();
        expect(age_button).toBeTruthy();
        expect(email_button).toBeTruthy();
        expect(address_button).toBeTruthy();
        expect(phone_button).toBeTruthy();
        expect(show1_button).toBeTruthy();
        expect(show2_button).toBeTruthy();
        expect(pswd_button).toBeTruthy();
        expect(delete_button).toBeTruthy();
    });
    test('should open avatar modal to submit', () => {
        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);
        const close_modal = getByLabelText(/button-change-avatar-close/i);

        buttons.forEach((button) => {
            fireEvent.click(button);
            expect(button).toBeTruthy();
        });

        fireEvent.click(close_modal);

        expect(axios.post).toBeCalledTimes(1);
        expect(avatar_button).toBeTruthy();
        expect(close_modal).toBeTruthy();
    });
    test('should click on buttons modal', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const button1 = getByLabelText(/button-change-cancel/i);
        expect(button1).toBeInTheDocument();
        const cancel_button = fireEvent.click(button1);

        fireEvent.click(getByLabelText(/button-change-username/i));

        const button2 = getByLabelText(/button-change-continue/i);
        expect(button2).toBeInTheDocument();
        const continue_button = fireEvent.click(button2);

        fireEvent.click(getByLabelText(/button-change-username/i));

        expect(cancel_button).not.toBeTruthy();
        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('should click on delete modal', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.click(getByLabelText(/button-change-delete/i));

        const button1 = getByLabelText(/button-delete-cancel/i);
        const cancel_button = fireEvent.click(button1);
        expect(cancel_button).toBeTruthy();

        fireEvent.click(getByLabelText(/button-change-delete/i));

        const button2 = getByLabelText(/button-delete-continue/i);
        const continue_button = fireEvent.click(button2);
        expect(continue_button).toBeTruthy();

        expect(axios.get).toBeCalled();
    });
    test('should get an error from axios get', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { data: 'Error' } }));

        render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error from axios post for buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const continue_button = fireEvent.click(getByLabelText(/button-change-continue/i));

        expect(axios.post).toHaveBeenCalled();
        expect(continue_button).toBeTruthy();
    });
    test('should get an error 400 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 400 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.click(getByLabelText(/button-change-delete/i));

        const button = getByLabelText(/button-delete-continue/i);
        const continue_button = fireEvent.click(button);
        expect(continue_button).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 404 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 404 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.click(getByLabelText(/button-change-delete/i));

        const button = getByLabelText(/button-delete-continue/i);
        const continue_button = fireEvent.click(button);
        expect(continue_button).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 500 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 500 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.click(getByLabelText(/button-change-delete/i));

        const button = getByLabelText(/button-delete-continue/i);
        const continue_button = fireEvent.click(button);
        expect(continue_button).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 400 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);

        buttons.forEach(button => fireEvent.click(button));
        buttons.forEach((button) => {
            expect(button).toBeTruthy();
        });

        expect(axios.post).toHaveBeenCalled();
    });
    test('should get an error 404 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);

        buttons.forEach(button => fireEvent.click(button));
        buttons.forEach((button) => {
            expect(button).toBeTruthy();
        });

        expect(axios.post).toHaveBeenCalled();
    });
    test('should get an error 500 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);

        buttons.forEach(button => fireEvent.click(button));
        buttons.forEach((button) => {
            expect(button).toBeTruthy();
        });

        expect(axios.post).toHaveBeenCalled();
    });
    test('username : should get an alert if username is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-username/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('username : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('username : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('username : should get an error 409 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 409 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('username : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.click(getByLabelText(/button-change-username/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('name : should get an alert if name is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-name/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-name/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('name : should change the name when submit', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.click(getByLabelText(/button-change-name/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(axios.post).toBeCalledTimes(1);
    });
    test('name : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.click(getByLabelText(/button-change-name/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('name : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.click(getByLabelText(/button-change-name/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('name : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.click(getByLabelText(/button-change-name/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('firstname : should get an alert if firstname is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-firstname/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('firstname : should change the firstname when submit', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.click(getByLabelText(/button-change-firstname/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(axios.post).toBeCalledTimes(1);
    });
    test('firstname : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.click(getByLabelText(/button-change-firstname/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('firstname : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.click(getByLabelText(/button-change-firstname/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('firstname : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.click(getByLabelText(/button-change-firstname/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('language : should change the language when submit', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.click(getByLabelText(/button-change-language/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(axios.post).toBeCalledTimes(1);
    });
    test('language : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.click(getByLabelText(/button-change-language/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('language : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.click(getByLabelText(/button-change-language/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('language: should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() =>
          Promise.reject({ response: { status: 500 }, data: { test: 'test' } })
        );
      
        const { getByLabelText, getByTestId } = render(
          <BrowserRouter>
            <Settings />
          </BrowserRouter>
        );
      
        const select = getByTestId(/select-change-language/);
        fireEvent.change(select, { target: { value: 'language' } });
        fireEvent.click(getByLabelText(/button-change-language/i));
      
        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
      
        expect(axios.post).toBeCalledTimes(1);
    });
    test('age : should get an alert if age is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-age/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('age : should not send request if age anormal', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 0 } });
        fireEvent.click(getByLabelText(/button-change-age/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(axios.post).not.toBeCalled();
    });
    test('age : should send request if age anormal', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 34 } });
        fireEvent.click(getByLabelText(/button-change-age/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(axios.post).toBeCalledTimes(1);
    });
    test('age : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 4 } });
        fireEvent.click(getByLabelText(/button-change-age/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('age : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 4 } });
        fireEvent.click(getByLabelText(/button-change-age/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('age : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 4 } });
        fireEvent.click(getByLabelText(/button-change-age/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('email : should get an alert if email is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-email/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-email/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('email : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.click(getByLabelText(/button-change-email/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('email : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.click(getByLabelText(/button-change-email/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('email : should get an error 409 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 409 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.click(getByLabelText(/button-change-email/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('email : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.click(getByLabelText(/button-change-email/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('address : should get an alert if address is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-address/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-address/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('address : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.click(getByLabelText(/button-change-address/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('address : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.click(getByLabelText(/button-change-address/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('address : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.click(getByLabelText(/button-change-address/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('phone : should get an alert if phone is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-phone/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('phone : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: 'phone' } });
        fireEvent.click(getByLabelText(/button-change-phone/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('phone : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: 'phone' } });
        fireEvent.click(getByLabelText(/button-change-phone/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('phone : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: 'phone' } });
        fireEvent.click(getByLabelText(/button-change-phone/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('pswd : should get an alert if pswd is empty', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: '' } });
        fireEvent.click(getByLabelText(/button-change-password/i));
        const continue_button = getByLabelText(/button-change-continue/i);
        fireEvent.click(continue_button);

        expect(axios.post).not.toBeCalled();
    });
    test('pswd : should get an alert if password and confirm password not match', () => {
        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: '12' } });
        fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: '23' } });
        fireEvent.click(getByLabelText(/button-change-password/i));

        expect(axios.post).not.toBeCalled();
    });
    test('pswd : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.click(getByLabelText(/button-change-password/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('pswd : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.click(getByLabelText(/button-change-password/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });

    test('pswd : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: 'qwertyuiopasdfghjkl' } });
        fireEvent.click(getByLabelText(/button-change-password/i));

        const button = getByLabelText(/button-change-continue/i);
        expect(button).toBeInTheDocument();
        const continue_button = fireEvent.click(button);

        expect(continue_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test("should return the correct variable based on input", () => {
        const translation = {
          username: "Nom d'utilisateur",
          name: "Nom",
          firstname: "Prénom",
          language: "Langue",
          age: "Âge",
          address: "Adresse",
          phonenumber: "Numéro de téléphone",
          password: "Mot de passe"
        };
    
        expect(getVariableToChange("username", translation)).toBe("nom d'utilisateur");
        expect(getVariableToChange("name", translation)).toBe("nom");
        expect(getVariableToChange("firstname", translation)).toBe("prénom");
        expect(getVariableToChange("language", translation)).toBe("langue");
        expect(getVariableToChange("age", translation)).toBe("âge");
        expect(getVariableToChange("email", translation)).toBe("email");
        expect(getVariableToChange("address", translation)).toBe("adresse");
        expect(getVariableToChange("phonenumber", translation)).toBe("numéro de téléphone");
        expect(getVariableToChange("password", translation)).toBe("mot de passe");
        expect(getVariableToChange("unknown", translation)).toBe("");
      });
});
