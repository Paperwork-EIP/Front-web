import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginPage from "../../pages/Login";
import Login from "../../container/Login/Login";
import { postRequest } from "../mocks/api/api";

jest.mock("@chakra-ui/react", () => {
    // --> Original module
    const originalModule = jest.requireActual("@chakra-ui/react");

    return {
        __esModule: true,
        ...originalModule,
        useMediaQuery: jest.fn().mockImplementation(() => ({
            isMobile: false,
        })),
    };
});

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("LoginPage", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    });
});

describe("Units tests", () => {
    it('should have an email input', () => {
        const input = screen.getByRole('textbox', { name: /email/i, hidden: true });

        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('chakra-input');
    });

    it('should have a password input', () => {
        const input = screen.getByRole('textbox', { name: /password/i, hidden: true });

        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('chakra-input');
    });

    it('should have a submit button', () => {
        const button = screen.getByRole('button', { name: /submit/i, hidden: true });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('chakra-button');
    });
});

describe("Integration tests", () => {
    test("Press submit button : should submit a request after clicking on submit button with email/password", async () => {
        const mockData = {
            emailAdress: "test@test.com",
            password: "test"
        };

        const mockResponse = {
            data: {
                token: "test",
                username: "test",
                email: "test@gmail.com",
                id: "test"
            }
        };

        const mockFetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockResponse)
            });
        });

        const mockPost = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockData)
            });
        });

        global.fetch = mockFetch;

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        /* const request = await postRequest("/login", mockData); */

        const emailPlaceholder = screen.queryByPlaceholderText(/mama@gmail.com/i)!;
        const passwordPlaceholder = screen.queryByPlaceholderText(/[************]/i)!;

        user.type(emailPlaceholder, mockData.emailAdress);
        user.type(passwordPlaceholder, mockData.password);
        user.click(screen.getByText("submit"));

        expect(mockPost).toHaveBeenCalledWith("/login", mockData);
        expect(mockPost).toHaveBeenCalledTimes(1);

        /* expect(request).toEqual(mockResponse); */

        await screen.findByText(/login/i);

        expect(screen.getByText(mockData.emailAdress)).toBeInTheDocument();
        expect(screen.getByText(mockData.password)).toBeInTheDocument();
    });

    /////////////////////////// INVALID CASE TESTS ///////////////////////////

    test("Press submit button : should not submit a request after clicking on submit button without email/password", async () => {
        const errorMessageToFind = "Please enter a valid email address and password";

        /* const request = await postRequest("/login", mockData); */
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.click(screen.getByText("submit"));

        expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
    });

    test("Press submit button : should not submit a request after clicking on submit button without a valid email", async () => {
        const mockData = {
            emailAdress: "s",
            password: "test"
        };

        /* const mockResponse = {
            data: {
                token: "test"
            }
        }; */

        const errorMessageToFind = "Please enter a valid email address";

        /* const request = await postRequest("/login", mockData); */
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.type(screen.getByPlaceholderText("email"), mockData.emailAdress);
        user.type(screen.getByPlaceholderText("password"), mockData.password);
        user.click(screen.getByText("submit"));

        expect(postRequest).toHaveBeenCalledWith("/login", mockData);
        expect(postRequest).toHaveBeenCalledTimes(1);
        expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
    });

    test("Press submit button : should not submit a request after clicking on submit button without a valid password", async () => {
        const mockData = {
            emailAdress: "test@test.com",
            password: "s"
        };

        /* const mockResponse = {
            data: {
                token: "test"
            }
        }; */

        const errorMessageToFind = "Invalid password";

        /* const request = await postRequest("/login", mockData); */
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.type(screen.getByPlaceholderText("email"), mockData.emailAdress);
        user.type(screen.getByPlaceholderText("password"), mockData.password);
        user.click(screen.getByText("submit"));

        expect(postRequest).toHaveBeenCalledWith("/login", mockData);
        expect(postRequest).toHaveBeenCalledTimes(1);
        expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
    });

    test("Press create an account link : should be redirected in the create profile page", async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.click(screen.getByText("Create an account"));

        await screen.findByText("/register");
    });

    test("Press Google login auth : should be connected with a Google account", async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.click(screen.getByText("Google"));

        // expect('login_function_Google').toHaveBeenCalled();
        expect('/google').toBeCalled();

        await screen.findByText("/google");
    });

    test("Press Facebook login auth : should be connected with a Facebook account", async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        user.click(screen.getByText("Facebook"));

        // expect('login_function_Facebook').toHaveBeenCalled();
        expect('/facebook').toBeCalled();

        await screen.findByText("/facebook");
    });
});