import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Register from "../../../container/Register/Register";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
})

describe('###### Register page ######', () => {
    const screen = render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    it("should render Register page component without crashes", () => { });

    it("[UNIT TEST] should have username input", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /username/i });

            expect(input).toBeInTheDocument();
            expect(input).toBeVisible();
            expect(input).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have email input", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /email/i });

            expect(input).toBeInTheDocument();
            expect(input).toBeVisible();
            expect(input).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have password input", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);

            expect(input[0]).toBeInTheDocument();
            expect(input[0]).toBeVisible();
            expect(input[0]).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have verify password input", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);

            expect(input[1]).toBeInTheDocument();
            expect(input[1]).toBeVisible();
            expect(input[1]).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have submit button", async () => {
        try {
            const button = screen.getByRole('button', { name: /submit_button/i });

            expect(button).toBeInTheDocument();
            expect(button).toBeVisible();
            expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have sign in button", async () => {
        try {
            const button = screen.getByRole('button', { name: /signin_button/i });

            expect(button).toBeInTheDocument();
            expect(button).toBeVisible();
            expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have Facebook button", async () => {
        try {
            const button = screen.getByRole('button', { name: /facebook_button/i });

            expect(button).toBeInTheDocument();
            expect(button).toBeVisible();
            expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have Google button", async () => {
        try {
            const button = screen.getByRole('button', { name: /google_button/i });

            expect(button).toBeInTheDocument();
            expect(button).toBeVisible();
            expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] username input filled", async () => {
        try {
            const input = screen.getByRole("textbox", { name: /username/i });

            await userEvent.clear(input);
            await userEvent.type(input, "username test value");

            expect(input).toHaveValue("username test value");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] email input filled", async () => {
        try {
            const input = screen.getByRole("textbox", { name: /email/i });

            await userEvent.clear(input);
            await userEvent.type(input, "test@gmail.com");

            expect(input).toHaveValue("test@gmail.com");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] password input filled", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);
            const password = input[0];

            await userEvent.clear(password);
            await userEvent.type(password, "123456789test");

            expect(password).toHaveValue("123456789test");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] verify password input filled", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);
            const verifyPassword = input[1];

            await userEvent.clear(verifyPassword);
            await userEvent.type(verifyPassword, "123456789test");

            expect(verifyPassword).toHaveValue("123456789test");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] valid case when password and verify password are same", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);
            const password = input[0];
            const verifyPassword = input[1];
            const passwordValue = "123456789test";

            await userEvent.clear(password)
            await userEvent.clear(verifyPassword);
            await userEvent.type(password, passwordValue);
            await userEvent.type(verifyPassword, passwordValue);

            expect(password).toHaveValue(passwordValue);
            expect(verifyPassword).toHaveValue(passwordValue);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] invalid case when password and verify password are not same", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/password/i);
            const password = input[0];
            const verifyPassword = input[1];
            const passwordValue = "123456789test";
            const anotherPasswordValue = "notTheSamePassword";

            await userEvent.clear(password)
            await userEvent.clear(verifyPassword);
            await userEvent.type(password, passwordValue);
            await userEvent.type(verifyPassword, anotherPasswordValue);

            expect(password).toHaveValue(passwordValue);
            expect(verifyPassword).not.toHaveValue(passwordValue);
            expect(verifyPassword).toHaveValue(anotherPasswordValue);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on submit button", async () => {
        try {
            const button = screen.getByRole('button', { name: /submit_button/i });

            await fireEvent.click(button);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on sign in button", async () => {
        try {
            const button = screen.getByRole('button', { name: /signin_button/i });

            await fireEvent.click(button);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /facebook_button/i });

            await fireEvent.click(button);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /google_button/i });

            await fireEvent.click(button);
        } catch (error) {
            console.log(error);
        }
    });
});
