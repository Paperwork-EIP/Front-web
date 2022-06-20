import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";

import Register from "../../../container/Register/Register";
import mockFetch from '../../mocks/api/api';

beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
})

afterEach(() => {
    jest.restoreAllMocks();
});

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Register page", () => {
    test("should render the register form", () => { });
});

describe('Valid unit tests', () => {
    test('should render the email input', () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });

        expect(emailInput).toBeVisible();
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveClass('chakra-input');
        expect(emailInput).toHaveAttribute('aria-label', 'email');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('placeholder');
    });

    test('should render the password input', async () => {
        const passwordInput = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);

        expect(passwordInput).toBeVisible();
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveClass('chakra-input');
        expect(passwordInput).toHaveAttribute('aria-label');
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput).toHaveAttribute('placeholder');
    });

    test('should render the submit button', async () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });

        expect(submitButton).toBeVisible();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveClass('chakra-button');
        expect(submitButton).toHaveTextContent('submit');
    });

    test('should render the create an account button', async () => {
        const createAccountButton = screen.getByRole('button', { name: /Sign in/i });

        expect(createAccountButton).toBeVisible();
        expect(createAccountButton).toBeInTheDocument();
        expect(createAccountButton).toHaveClass('chakra-button');
        expect(createAccountButton).toHaveTextContent('Create an account');
    });

    test('should render the facebook button', async () => {
        const facebookButton = screen.getByRole('button', { name: /facebook/i });

        expect(facebookButton).toBeVisible();
        expect(facebookButton).toBeInTheDocument();
        expect(facebookButton).toHaveClass('chakra-button');
        expect(facebookButton).toHaveTextContent('Facebook');
    });

    test('should render the google button', async () => {
        const googleButton = screen.getByRole('button', { name: /google/i });

        expect(googleButton).toBeVisible();
        expect(googleButton).toBeInTheDocument();
        expect(googleButton).toHaveClass('chakra-button');
        expect(googleButton).toHaveTextContent('Google');
    });
});

describe('Valid integration tests', () => {
    test('should submit the form', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        const mockUserData = {
            email: 'test@test.com',
            password: 'toto'
        };

        await user.clear(emailInput);
        await user.type(emailInput, mockUserData.email);
        
        await user.clear(passwordInput);
        await user.type(passwordInput, mockUserData.password);

        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(emailInput).toHaveValue(mockUserData.email);
        expect(passwordInput).toHaveValue(mockUserData.password);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockUserData)
        });
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////

describe('Invalid integration tests', () => {
    test('Type in email field : should bu null', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        const mockUserData = {
            email: 'test@test.com',
            password: 'toto'
        };

        await user.clear(emailInput);
        
        await user.clear(passwordInput);
        await user.type(passwordInput, mockUserData.password);

        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(emailInput).not.toBeNull();
        expect(window.fetch).not.toBeCalled();
    });

    test('Type in password field : should bu null', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        const mockUserData = {
            email: 'test@test.com',
            password: 'toto'
        };

        await user.clear(emailInput);
        await user.type(emailInput, mockUserData.email);
        
        await user.clear(passwordInput);

        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(passwordInput).not.toBeNull();
        expect(window.fetch).not.toBeCalled();
    });
});