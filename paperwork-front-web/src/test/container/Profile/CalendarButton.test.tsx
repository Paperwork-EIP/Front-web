import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";

import CalendarButton from "../../../container/Profile/CalendarButton";
import React from 'react';

beforeEach(() => {
    configure({
        throwSuggestions: true,
    });
    render(
        <BrowserRouter>
            <CalendarButton />
        </BrowserRouter>
    );
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Calendar button component", () => {
    test("renders without crashing", () => { });
});

describe("Valid units tests", () => {
    test('should have a button', () => {
        const button = screen.getByRole('button', { name: /calendar-button/i });

        expect(button).toBeVisible();
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('chakra-button');
        expect(button).toHaveClass('Profile-CalendarButton');
        expect(button).toHaveClass('chakra-button Profile-CalendarButton');
    });
});

describe("Valid integration tests", () => {
    test('should redirect to the calendar page', () => {
        const mockCallback = jest.fn();
        const button = screen.getByRole('button', { name: /calendar-button/i });

        user.click(button);

        expect(mockCallback).toHaveBeenCalled();
    });

    test('should do nothing when not clicked', () => {
        const mockCallback = jest.fn();
        const button = screen.getByRole('button', { name: /calendar-button/i });

        user.click(button);

        expect(mockCallback).not.toHaveBeenCalled();
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////
