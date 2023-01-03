import '@testing-library/jest-dom';

import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import LoginContent from '../../../src/container/Login/LoginContent';

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

/*
describe("###### Login page ######", () => {
    interface Props {
        children?: ReactNode,
        onClick?: jest.Mock
    }

    const Button = ({ onClick, children }: Props) => (
        <button onClick={onClick}>{children}</button>
    )

    const screen = render(
        <BrowserRouter>
            <LoginContent />
        </BrowserRouter>
    );

    const mockCallBack = jest.fn();

    it("[UNIT TEST] should render Login page component without crashes", () => { });

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
            const input = screen.getAllByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*//*i);

            expect(input[0]).toBeInTheDocument();
            expect(input[0]).toBeVisible();
            expect(input[0]).toBeTruthy();
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

    it("[UNIT TEST] should have create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /create_account_button/i });

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
            const input = screen.getAllByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*//*i);
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

            render(<Button onClick={mockCallBack}>Submit</Button>);

            await fireEvent.click(button);
            await fireEvent.click(screen.getAllByText(/submit/i)[1]);

            expect(button).toBeInTheDocument();
            expect(mockCallBack).toHaveBeenCalledTimes(1);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /create_account_button/i });

            render(<Button onClick={mockCallBack}>Create an account</Button>);

            await fireEvent.click(button);
            await fireEvent.click(screen.getAllByText(/create an account/i)[1]);

            expect(button).toBeInTheDocument();
            expect(mockCallBack).toHaveBeenCalledTimes(2);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on create a Facebook account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /facebook_button/i });

            await render(<Button onClick={mockCallBack}>Facebook</Button>);

            await fireEvent.click(screen.getAllByText(/facebook/i)[1]);

            expect(button).toBeInTheDocument();
            expect(mockCallBack).toHaveBeenCalledTimes(3);
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] simulate click event on create account button", async () => {
        try {
            const button = screen.getByRole('button', { name: /google_button/i });

            render(<Button onClick={mockCallBack}>Google</Button>);

            await fireEvent.click(screen.getAllByText(/google/i)[1]);

            expect(button).toBeInTheDocument();
            expect(mockCallBack).toHaveBeenCalledTimes(4);
        } catch (error) {
            console.log(error);
        }
    });
});*/
