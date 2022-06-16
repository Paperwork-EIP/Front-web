import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginPage from "../../pages/Login";
import Login from "../../container/Login/Login";
import { postRequest } from "../api/api";

/////////////////////////// VALID TESTS ///////////////////////////

describe("LoginPage", () => {
    it("renders without crashing", () => {
        render(<LoginPage />);
    });
});

describe("when user clicked on submit button", () => {
    it("should call login function", () => {
        const login = jest.fn();
        const { getByText } = render(<Login />);
        const loginButton = getByText("submit");

        loginButton.click();
    
        expect(login).toHaveBeenCalled();
    });
});

describe("when user clicked on create an account button", () => {
    it("should call login function", () => {
        const login = jest.fn();
        const { getByText } = render(<Login />);
        const createAccountButton = getByText("create an account");

        createAccountButton.click();
    
        expect(login).toHaveBeenCalled();
    });
});

test("Press submit button : should submit a request after clicking on submit button with email/password", async () => {
    const mockData = {
        emailAdress: "test@test.com",
        password: "test"
    };

    /* const request = await postRequest("/login", mockData); */
    render(<Login />);

    user.type(screen.getByLabelText("email"), mockData.emailAdress);
    user.type(screen.getByLabelText("password"), mockData.password);
    user.click(screen.getByText("submit"));

    expect(postRequest).toHaveBeenCalledWith("/login", mockData);

    await screen.findByText(/login/i);

    expect(screen.getByText(mockData.emailAdress)).toBeInTheDocument();
    expect(screen.getByText(mockData.password)).toBeInTheDocument();
});

/////////////////////////// INVALID TESTS ///////////////////////////

test("Press submit button : should not submit a request after clicking on submit button without email/password", async () => {
    const errorMessageToFind = "Please enter a valid email address and password";

    /* const request = await postRequest("/login", mockData); */
    render(<Login />);

    user.click(screen.getByText("submit"));

    expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
});

test("Press submit button : should not submit a request after clicking on submit button without a valid email", async () => {
    const mockData = {
        emailAdress: "",
        password: "test"
    };

    const errorMessageToFind = "Please enter a valid email address";

    /* const request = await postRequest("/login", mockData); */
    render(<Login />);

    user.type(screen.getByLabelText("email"), mockData.emailAdress);
    user.type(screen.getByLabelText("password"), mockData.password);
    user.click(screen.getByText("submit"));

    expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
});

test("Press submit button : should not submit a request after clicking on submit button without a valid password", async () => {
    const mockData = {
        emailAdress: "test@test.com",
        password: ""
    };

    const errorMessageToFind = "Invalid password";

    /* const request = await postRequest("/login", mockData); */
    render(<Login />);

    user.type(screen.getByLabelText("email"), mockData.emailAdress);
    user.type(screen.getByLabelText("password"), mockData.password);
    user.click(screen.getByText("submit"));

    expect(postRequest).toHaveBeenCalledWith("/login", mockData);
    expect(screen.getByText(errorMessageToFind)).toBeInTheDocument();
});

test("Press create an account link : should be redirected in the create profile page", async () => {
    render(<Login />);

    user.click(screen.getByText("Create an account"));

    await screen.findByText("/register");
});

test("Press Google login auth : should be connected with a Google account", async () => {
    render(<Login />);

    user.click(screen.getByText("Google"));

    // expect('login_function_Google').toHaveBeenCalled();
    expect('/google').toBeCalled();

    await screen.findByText("/google");
});

test("Press Facebook login auth : should be connected with a Facebook account", async () => {
    render(<Login />);

    user.click(screen.getByText("Facebook"));

    // expect('login_function_Facebook').toHaveBeenCalled();
    expect('/facebook').toBeCalled();

    await screen.findByText("/facebook");
});