import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginPage from "../../pages/Login";
import Login from "../../container/Login/Login";
import { postRequest } from "../api/api";


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

/////////////////////////// VALID TESTS ///////////////////////////

describe("LoginPage", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    });
});

describe("Starting integration test", () => {
    test("Press submit button : should submit a request after clicking on submit button with email/password", async () => {
        const mockData = {
            emailAdress: "test@test.com",
            password: "test"
        };

        const mockResponse = {
            data: {
                token: "test"
            }
        };

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

        /* expect(request).toEqual(mockResponse); */

        await screen.findByText(/login/i);

        expect(screen.getByText(mockData.emailAdress)).toBeInTheDocument();
        expect(screen.getByText(mockData.password)).toBeInTheDocument();
    });

    /////////////////////////// INVALID TESTS ///////////////////////////

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