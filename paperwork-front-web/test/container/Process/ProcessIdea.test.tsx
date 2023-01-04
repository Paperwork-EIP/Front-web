import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import ProcessIdea from '../../../src/pages/ProcessIdea';

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <ProcessIdea />
        </BrowserRouter>
    );
})

describe("###### Process Idea page ######", () => {
    const screen = render(
        <BrowserRouter>
            <ProcessIdea />
        </BrowserRouter>
    );

    it("[UNIT TEST] should render ProcessIdea page component without crashes", () => { });

    it("[UNIT TEST] should have title input", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /title/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have description input", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /description/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have content input", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /content/i });

        expect(input).toBeInTheDocument();
        expect(input).toBeVisible();
        expect(input).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have cancel button", async () => {
        try {
            const button = screen.getByRole('button', { name: /cancel_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
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

    it("[UNIT TEST] should have cancel close button when user click on cancel button", async () => {
        try {
            const cancelButton = screen.getByRole('button', { name: /cancel_button/i });
            await userEvent.click(cancelButton);

            const button = screen.getByRole('button', { name: /cancel_close_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have cancel continue button when user click on cancel button", async () => {
        try {
            const cancelButton = screen.getByRole('button', { name: /cancel_button/i });
            await userEvent.click(cancelButton);

            const button = screen.getByRole('button', { name: /cancel_continue_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have submit close button when user click on submit button", async () => {
        try {
            const submitButton = screen.getByRole('button', { name: /submit_button/i });
            await userEvent.click(submitButton);

            const button = screen.getByRole('button', { name: /submit_close_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    it("[UNIT TEST] should have submit continue button when user click on submit button", async () => {
        try {
            const submitButton = screen.getByRole('button', { name: /submit_button/i });
            await userEvent.click(submitButton);

            const button = screen.getByRole('button', { name: /submit_continue_button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] title input filled", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /title/i });

            await userEvent.clear(input);
            await userEvent.type(input, "This is the title");

            expect(input).toHaveValue("This is the title");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] description input filled", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /description/i });

            await userEvent.clear(input);
            await userEvent.type(input, "This is the description");

            expect(input).toHaveValue("This is the description");
        } catch (error) {
            console.log(error);
        }
    });

    test("[INTEGRATION TEST] content input filled", async () => {
        try {
            const input = screen.getByRole('textbox', { name: /content/i });

            await userEvent.clear(input);
            await userEvent.type(input, "This is the content");

            expect(input).toHaveValue("This is the content");
        } catch (error) {
            console.log(error);
        }
    });
});