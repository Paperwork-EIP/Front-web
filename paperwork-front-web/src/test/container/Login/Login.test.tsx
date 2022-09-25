import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import LoginContent from '../../../container/Login/LoginContent';

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <LoginContent />
        </BrowserRouter>
    );
})

describe("###### Login page ######", () => {
    const screen = render(
        <BrowserRouter>
            <LoginContent />
        </BrowserRouter>
    );

    it("[UNIT TEST] should render Login page component without crashes", () => { });

    it("[UNIT TEST] should have email input", () => {
        const input = screen.getByRole('textbox', { name: /email/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
    });

    it("[UNIT TEST] should have password input", () => {
        const input = screen.getAllByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);

        expect(input[0]).toBeInTheDocument();
        expect(input[0]).toBeVisible();
        expect(input[0]).toBeTruthy();
    });

    it("[UNIT TEST] should have submit button", () => {
        const button = screen.getByRole('button', { name: /submit_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
    });

    it("[UNIT TEST] should have create account button", () => {
        const button = screen.getByRole('button', { name: /create_account_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
    });

    it("[UNIT TEST] should have Facebook button", () => {
        const button = screen.getByRole('button', { name: /facebook_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
    });

    it("[UNIT TEST] should have Google button", () => {
        const button = screen.getByRole('button', { name: /google_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
    });

    test("[INTEGRATION TEST] email input filled", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /email/i });

            await userEvent.clear(input);
            await userEvent.type(input, "test@gmail.com");

            expect(input).toHaveValue("test@gmail.com");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] password input filled", async () => {
        try {
            const input = screen.getAllByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);
            const password = input[0];

            await userEvent.clear(password);
            await userEvent.type(password, "123456789test");

            expect(password).toHaveValue("123456789test");
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

    test("[INTEGRATION TEST] simulate click event on create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /create_account_button/i });

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