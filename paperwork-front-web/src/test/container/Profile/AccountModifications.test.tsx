import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("###### Account modification page ######", () => {
    const screen = render(
        <BrowserRouter>
            <AccountModifications />
        </BrowserRouter>
    );

    it("[UNIT TEST] should render Account modification component without crashes", () => { });

    it("[UNIT TEST] should have username input", () => {
        const input = screen.getByRole('textbox', { name: /username/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
    });

    it("[UNIT TEST] should have email input", () => {
        const input = screen.getByRole('textbox', { name: /email/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
    });

    it("[UNIT TEST] should have password input", () => {
        const input = screen.getAllByPlaceholderText(/password/i);

        expect(input[0]).toBeInTheDocument();
        expect(input[0]).toBeVisible();
        expect(input[0]).toBeTruthy();
    });

    it("[UNIT TEST] should have verify password input", () => {
        const input = screen.getAllByPlaceholderText(/password/i);

        expect(input[1]).toBeInTheDocument();
        expect(input[1]).toBeVisible();
        expect(input[1]).toBeTruthy();
    });

    test("[INTEGRATION TEST] username input filled", async () => {
        const input = screen.getByRole("textbox", { name: /username/i });

        await userEvent.clear(input);
        await userEvent.type(input, "username test value");

        expect(input).toHaveValue("username test value");
    });

    test("[INTEGRATION TEST] email input filled", async () => {
        const input = screen.getByRole("textbox", { name: /email/i });

        await userEvent.clear(input);
        await userEvent.type(input, "test@gmail.com");

        expect(input).toHaveValue("test@gmail.com");
    });

    test("[INTEGRATION TEST] password input filled", async () => {
        const input = screen.getAllByPlaceholderText(/password/i);
        const password = input[0];

        await userEvent.clear(password);
        await userEvent.type(password, "123456789test");

        expect(password).toHaveValue("123456789test");
    });

    test("[INTEGRATION TEST] verify password input filled", async () => {
        const input = screen.getAllByPlaceholderText(/password/i);
        const verifyPassword = input[1];

        await userEvent.clear(verifyPassword);
        await userEvent.type(verifyPassword, "123456789test");

        expect(verifyPassword).toHaveValue("123456789test");
    });

    test("[INTEGRATION TEST] valid case when password and verify password are same", async () => {
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
    });

    test("[INTEGRATION TEST] invalid case when password and verify password are not same", async () => {
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
    });
});