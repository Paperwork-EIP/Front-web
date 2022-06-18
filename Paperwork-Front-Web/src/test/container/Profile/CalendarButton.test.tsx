import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";

import CalendarButton from "../../../container/Profile/CalendarButton";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Calendar button component", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <CalendarButton />
            </BrowserRouter>
        );
    });
});

describe("Units tests", () => {
    test('should have a button', () => {
        const button = screen.getByRole('button', { name: /calendar-button/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('chakra-button');
        expect(button).toHaveClass('Profile-CalendarButton');
        expect(button).toHaveClass('chakra-button Profile-CalendarButton');
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////

describe("Integration tests", () => {
    test('should redirect to the calendar page', () => {
        render(
            <BrowserRouter>
                <CalendarButton />
                {/* Pas de onClick pour l'instant */}
            </BrowserRouter>
        );

        const mockCallback = jest.fn();
        const button = screen.getByRole('button', { name: /calendar-button/i });

        user.click(button);

        expect(mockCallback).toHaveBeenCalled();
    });
});