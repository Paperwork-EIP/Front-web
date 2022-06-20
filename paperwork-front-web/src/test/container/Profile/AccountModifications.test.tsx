import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";

import AccountModifications from "../../../container/Profile/AccountModifications";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <AccountModifications />
        </BrowserRouter>
    );
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Account modification page", () => {
    test("renders without crashing", () => { });
});

describe('Valid unit tests', () => {
    test('should render the username input', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });

        expect(usernameInput).toBeVisible();
        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveClass('chakra-input');
        expect(usernameInput).toHaveAttribute('aria-label', 'username');
        expect(usernameInput).toHaveAttribute('type', 'text');
        expect(usernameInput).toHaveAttribute('placeholder');
    });

    test('should render the email input', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });

        expect(emailInput).toBeVisible();
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveClass('chakra-input');
        expect(emailInput).toHaveAttribute('aria-label', 'email');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('placeholder');
    });

    test('should render the password inputs', async () => {
        const passwordInput = screen.getAllByPlaceholderText(/password/i);

        for (let i = 0; i < passwordInput.length; i++) {
            expect(passwordInput[i]).toBeVisible();
            expect(passwordInput[i]).toBeInTheDocument();
            expect(passwordInput[i]).toHaveClass('chakra-input');
            expect(passwordInput[i]).toHaveAttribute('aria-label');
            expect(passwordInput[i]).toHaveAttribute('type', 'password');
            expect(passwordInput[i]).toHaveAttribute('placeholder');
        }
    });
});

describe('Valid integration tests', () => {
    test('Type in username field : should fetch input data for username when user typing', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });

        await user.clear(usernameInput);
        await user.type(usernameInput, 'username test input');

        expect(usernameInput).toHaveValue('username test input');
    });

    test('Type in email field : should fetch input data for email when user typing', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });

        await user.clear(emailInput);
        await user.type(emailInput, 'test@test.com');

        expect(emailInput).toHaveValue('test@test.com');
    });

    test('Type in password field : should fetch input data for password when user typing', async () => {
        const passwordInput = screen.getByPlaceholderText(/enter password/i);

        await user.clear(passwordInput);
        await user.type(passwordInput, 'blablacar');

        expect(passwordInput).toHaveValue('blablacar');
    });

    test('Type in verify password field : should fetch input data for password when user typing', async () => {
        const passwordInput = screen.getByPlaceholderText(/enter password/i)
        const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i)
        const passwordInputValue = 'blablacar';

        await user.clear(passwordInput);
        await user.type(passwordInput, passwordInputValue);

        await user.clear(verifyPasswordInput);
        await user.type(verifyPasswordInput, passwordInputValue);

        expect(passwordInput).toHaveValue(passwordInputValue);
        expect(verifyPasswordInput).toHaveValue(passwordInputValue);
    });

    test('Fill all fields : fill all fields with correct information', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/enter password/i);
        const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i);

        const mockData = {
            username: 'username test input',
            email: 'test@test.com',
            password: 'blablacar'
        };

        await user.clear(usernameInput);
        await user.type(usernameInput, mockData.username);

        await user.clear(emailInput);
        await user.type(emailInput, mockData.email);

        await user.clear(passwordInput);
        await user.type(passwordInput, mockData.password);

        await user.clear(verifyPasswordInput);
        await user.type(verifyPasswordInput, mockData.password);

        expect(usernameInput).toHaveValue(mockData.username);
        expect(emailInput).toHaveValue(mockData.email);
        expect(passwordInput).toHaveValue(mockData.password);
        expect(verifyPasswordInput).toHaveValue(mockData.password);
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////

describe('Invalid integration tests', () => {
    test('Type in username field : should be null', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });

        await user.clear(usernameInput);

        expect(usernameInput).not.toBeNull();
    });

    test('Type in email field : should fetch input data for email when user typing', async () => {
        const emailInput = screen.getByRole('textbox', { name: /email/i });

        await user.clear(emailInput);

        expect(emailInput).not.toBeNull();
    });

    test('Type in password field : should not have the same password of user\'s account', async () => {
        const passwordInput = screen.getByPlaceholderText(/enter password/i);

        await user.clear(passwordInput);

        expect(passwordInput).not.toBeNull();
    });

    test('Type in verify password field : should fetch input data for password when user typing', async () => {
        const passwordInput = screen.getByPlaceholderText(/enter password/i)
        const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i)
        const passwordInputValue = 'blablacar';
        const verifyPassWordValue = 'not the same password';

        await user.clear(passwordInput);
        await user.type(passwordInput, passwordInputValue);

        await user.clear(verifyPasswordInput);
        await user.type(verifyPasswordInput, verifyPassWordValue);

        expect(passwordInput).toHaveValue(passwordInputValue);
        expect(verifyPasswordInput).toHaveValue(verifyPassWordValue);
        expect(passwordInput).not.toHaveValue(verifyPassWordValue);
        expect(verifyPasswordInput).not.toHaveValue(passwordInputValue);
        expect(passwordInput).not.toBeNull();
        expect(verifyPasswordInput).not.toBeNull();
    });

    describe('Fill all fields : fill all fields with incorrect information', () => {
        test('Invalid username : should be null', async () => {
            const usernameInput = screen.getByRole('textbox', { name: /username/i });
            const emailInput = screen.getByRole('textbox', { name: /email/i });
            const passwordInput = screen.getByPlaceholderText(/enter password/i);
            const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i);
            const mockData = {
                username: '',
                email: 'test@test.com',
                password: 'blablacar'
            };
            const submitButton = screen.getByRole('button', { name: /submit/i });
            const mockPostData = jest.fn();

            await user.clear(usernameInput);

            await user.clear(emailInput);
            await user.type(emailInput, mockData.email);

            await user.clear(passwordInput);
            await user.type(passwordInput, mockData.password);

            await user.clear(verifyPasswordInput);
            await user.type(verifyPasswordInput, mockData.password);

            await user.click(submitButton);

            expect(mockPostData).not.toHaveBeenCalled();
            expect(usernameInput).not.toBeNull();
            expect(emailInput).toHaveValue(mockData.email);
            expect(passwordInput).toHaveValue(mockData.password);
            expect(verifyPasswordInput).toHaveValue(mockData.password);
        });

        test('Invalid email : should be null', async () => {
            const usernameInput = screen.getByRole('textbox', { name: /username/i });
            const emailInput = screen.getByRole('textbox', { name: /email/i });
            const passwordInput = screen.getByPlaceholderText(/enter password/i);
            const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i);
            const mockData = {
                username: 'username test input',
                email: '',
                password: 'blablacar'
            };
            const submitButton = screen.getByRole('button', { name: /submit/i });
            const mockPostData = jest.fn();

            await user.clear(usernameInput);
            await user.type(usernameInput, mockData.username);

            await user.clear(emailInput);

            await user.clear(passwordInput);
            await user.type(passwordInput, mockData.password);

            await user.clear(verifyPasswordInput);
            await user.type(verifyPasswordInput, mockData.password);

            await user.click(submitButton);

            expect(mockPostData).not.toHaveBeenCalled();
            expect(usernameInput).toHaveValue(mockData.username);
            expect(emailInput).not.toBeNull();
            expect(passwordInput).toHaveValue(mockData.password);
            expect(verifyPasswordInput).toHaveValue(mockData.password);
        });

        test('Invalid password : should be null', async () => {
            const usernameInput = screen.getByRole('textbox', { name: /username/i });
            const emailInput = screen.getByRole('textbox', { name: /email/i });
            const passwordInput = screen.getByPlaceholderText(/enter password/i);
            const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i);
            const mockData = {
                username: 'username test input',
                email: 'test@test.com',
                password: 'blablacar'
            };
            const submitButton = screen.getByRole('button', { name: /submit/i });
            const mockPostData = jest.fn();

            await user.clear(usernameInput);
            await user.type(usernameInput, mockData.username);

            await user.clear(emailInput);

            await user.clear(passwordInput);

            await user.clear(verifyPasswordInput);
            await user.type(verifyPasswordInput, mockData.password);

            await user.click(submitButton);

            expect(mockPostData).not.toHaveBeenCalled();
            expect(usernameInput).toHaveValue(mockData.username);
            expect(emailInput).toHaveValue(mockData.email);
            expect(passwordInput).not.toBeNull();
            expect(verifyPasswordInput).toHaveValue(mockData.password);
        });

        test('Invalid verify password : should not be the same with password input', async () => {
            const usernameInput = screen.getByRole('textbox', { name: /username/i });
            const emailInput = screen.getByRole('textbox', { name: /email/i });
            const passwordInput = screen.getByPlaceholderText(/enter password/i);
            const verifyPasswordInput = screen.getByPlaceholderText(/verify password/i);
            const mockData = {
                username: 'username test input',
                email: 'test@test.com',
                password: 'blablacar'
            };
            const submitButton = screen.getByRole('button', { name: /submit/i });
            const mockPostData = jest.fn();

            await user.clear(usernameInput);
            await user.type(usernameInput, mockData.username);

            await user.clear(emailInput);
            await user.type(emailInput, mockData.email);

            await user.clear(passwordInput);
            await user.type(passwordInput, mockData.password);

            await user.clear(verifyPasswordInput);
            await user.type(verifyPasswordInput, 'not the same password');

            await user.click(submitButton);

            expect(mockPostData).not.toHaveBeenCalled();
            expect(usernameInput).toHaveValue(mockData.username);
            expect(emailInput).toHaveValue(mockData.email);
            expect(passwordInput).toHaveValue(mockData.password);
            expect(verifyPasswordInput).not.toHaveValue(mockData.password);
        });
    });
});