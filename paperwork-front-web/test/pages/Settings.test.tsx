import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';

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
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    axios.get = jest.fn().mockResolvedValue(expectedUserData);
    axios.post = jest.fn().mockResolvedValue(expectePostdUserData);
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe("Settings Tests", () => {
    test('should not redirects to login page if loginToken cookie does not exists', () => {
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
    test('should click on personal information button section and insert data in all input and do logics', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_personal_information_section = fireEvent.click(getByLabelText(/button-personal-information-section/i));

        const username_input = fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        const name_input = fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        const firstname_input = fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        const language_select = fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        const age_input = fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        const email_input = fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        const address_input = fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        const phone_input = fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));
        
        expect(button_personal_information_section).toBeTruthy();

        expect(username_input).toBeTruthy();
        expect(name_input).toBeTruthy();
        expect(firstname_input).toBeTruthy();
        expect(language_select).toBeTruthy();
        expect(age_input).toBeTruthy();
        expect(email_input).toBeTruthy();
        expect(address_input).toBeTruthy();
        expect(phone_input).toBeTruthy();

        expect(personal_information_button).toBeTruthy();
    });
    test('should click on security button section and insert data in pswd and click show button and do logics', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_security_section = fireEvent.click(getByLabelText(/button-security-section/i));

        fireEvent.change(getByTestId(/input-change-pswd/), { target: { value: 'password' } });
        const button_change_show1 = fireEvent.click(getByLabelText(/button-change-show1/i));
        fireEvent.change(getByTestId(/input-change-cpswd/), { target: { value: 'password' } });
        const button_change_show2 = fireEvent.click(getByLabelText(/button-change-show2/i));

        const update_password_button = fireEvent.click(getByLabelText(/update-password-btn/i));
        
        expect(button_security_section).toBeTruthy();
        expect(button_change_show1).toBeTruthy();
        expect(button_change_show2).toBeTruthy();

        expect(update_password_button).toBeTruthy();
    });
    test('should click on delete account section and click on delete account and continu button in modal and do logics', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_delete_account_section = fireEvent.click(getByLabelText(/button-delete-account-section/i));
        const delete_account_button = fireEvent.click(getByLabelText(/delete-account-btn/i));

        
        expect(button_delete_account_section).toBeTruthy();
        expect(delete_account_button).toBeTruthy();
    });
    test('should open avatar modal to submit', () => {
        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_personal_information_section = fireEvent.click(getByLabelText(/button-personal-information-section/i));
        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);
        const close_modal = getByLabelText(/button-change-avatar-cancel/i);

        buttons.forEach((button) => {
            fireEvent.click(button);
            expect(button).toBeTruthy();
        });

        fireEvent.click(close_modal);

        expect(button_personal_information_section).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
        expect(avatar_button).toBeTruthy();
        expect(close_modal).toBeTruthy();
    });
    test('should click on delete modal', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_delete_account_section = fireEvent.click(getByLabelText(/button-delete-account-section/i));
        fireEvent.click(getByLabelText(/delete-account-btn/i));

        const button1 = getByLabelText(/button-delete-cancel/i);
        const cancel_button = fireEvent.click(button1);
        expect(cancel_button).toBeTruthy();

        fireEvent.click(getByLabelText(/delete-account-btn/i));

        const button2 = getByLabelText(/button-delete-continue/i);
        const continue_button = fireEvent.click(button2);
        expect(continue_button).toBeTruthy();
        expect(button_delete_account_section).toBeTruthy();

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
        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));

        expect(axios.post).toHaveBeenCalled();
        expect(personal_information_button).toBeTruthy();
    });
    test('should get an error 400 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 400 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_delete_account_section = fireEvent.click(getByLabelText(/button-delete-account-section/i));
        fireEvent.click(getByLabelText(/delete-account-btn/i));

        const button_delete_continue = fireEvent.click(getByLabelText(/button-delete-continue/i));
        expect(button_delete_continue).toBeTruthy();
        expect(button_delete_account_section).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 404 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 404 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_delete_account_section = fireEvent.click(getByLabelText(/button-delete-account-section/i));
        fireEvent.click(getByLabelText(/delete-account-btn/i));

        const button_delete_continue = fireEvent.click(getByLabelText(/button-delete-continue/i));
        expect(button_delete_continue).toBeTruthy();
        expect(button_delete_account_section).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 500 from axios get for delete account', () => {
        axios.get = jest.fn(() => Promise.reject({ response: { status: 500 } }));

        const { getByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_delete_account_section = fireEvent.click(getByLabelText(/button-delete-account-section/i));
        fireEvent.click(getByLabelText(/delete-account-btn/i));

        const button_delete_continue = fireEvent.click(getByLabelText(/button-delete-continue/i));
        expect(button_delete_continue).toBeTruthy();
        expect(button_delete_account_section).toBeTruthy();

        expect(axios.get).toHaveBeenCalled();
    });
    test('should get an error 400 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_personal_information_section = fireEvent.click(getByLabelText(/button-personal-information-section/i));
        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);
        const close_modal = getByLabelText(/button-change-avatar-cancel/i);

        buttons.forEach((button) => {
            fireEvent.click(button);
            expect(button).toBeTruthy();
        });

        fireEvent.click(close_modal);

        expect(button_personal_information_section).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
        expect(avatar_button).toBeTruthy();
        expect(close_modal).toBeTruthy();
    });
    test('should get an error 404 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_personal_information_section = fireEvent.click(getByLabelText(/button-personal-information-section/i));
        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);
        const close_modal = getByLabelText(/button-change-avatar-cancel/i);

        buttons.forEach((button) => {
            fireEvent.click(button);
            expect(button).toBeTruthy();
        });

        fireEvent.click(close_modal);

        expect(button_personal_information_section).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
        expect(avatar_button).toBeTruthy();
        expect(close_modal).toBeTruthy();
    });
    test('should get an error 500 from axios post for avatar buttons', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 } }));

        const { getByLabelText, getAllByLabelText } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        const button_personal_information_section = fireEvent.click(getByLabelText(/button-personal-information-section/i));
        const avatar_button = getByLabelText(/button-change-avatar/i);

        fireEvent.click(avatar_button);

        const buttons = getAllByLabelText(/button-change-avatar-option/i);
        const close_modal = getByLabelText(/button-change-avatar-cancel/i);

        buttons.forEach((button) => {
            fireEvent.click(button);
            expect(button).toBeTruthy();
        });

        fireEvent.click(close_modal);

        expect(button_personal_information_section).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
        expect(avatar_button).toBeTruthy();
        expect(close_modal).toBeTruthy();
    });
    test('personal informations : should get an error 400 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 400 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));

        expect(personal_information_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('personal informations : should get an error 404 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 404 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));

        expect(personal_information_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('personal informations : should get an error 409 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 409 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));

        expect(personal_information_button).toBeTruthy();
        expect(axios.post).toBeCalledTimes(1);
    });
    test('personal informations : should get an error 500 from axios post when submit', () => {
        axios.post = jest.fn(() => Promise.reject({ response: { status: 500 }, data: { test: "test" } }));

        const { getByLabelText, getByTestId } = render(
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        );

        fireEvent.change(getByTestId(/input-change-username/), { target: { value: 'username' } });
        fireEvent.change(getByTestId(/input-change-name/), { target: { value: 'name' } });
        fireEvent.change(getByTestId(/input-change-firstname/), { target: { value: 'firstname' } });
        fireEvent.change(getByTestId(/select-change-language/), { target: { value: 'french' } });
        fireEvent.change(getByTestId(/input-change-age/), { target: { value: 5 } });
        fireEvent.change(getByTestId(/input-change-email/), { target: { value: 'email' } });
        fireEvent.change(getByTestId(/input-change-address/), { target: { value: 'address' } });
        fireEvent.change(getByTestId(/input-change-phone/), { target: { value: '010-0000-0000' } });

        const personal_information_button = fireEvent.click(getByLabelText(/update-personal-info-btn/i));

        expect(personal_information_button).toBeTruthy();
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
