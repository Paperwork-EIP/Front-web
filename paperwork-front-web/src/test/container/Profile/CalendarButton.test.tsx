import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent, getByRole } from "@testing-library/react";

import CalendarButton from "../../../container/Profile/CalendarButton";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    });
})

describe("###### Calendar button component ######", () => {
    it("[UNIT TEST] should render Calendar button component without crashes", () => {
        render(
            <BrowserRouter>
                <CalendarButton />
            </BrowserRouter>
        );
    });

    it('[INTERGRATION TEST] simulate click event on calendar button', () => {
        const screen = render(
            <BrowserRouter>
                <CalendarButton />
            </BrowserRouter>
        );
        const calendarButton = screen.getByRole('button', { name: /calendar\-button/i });
        fireEvent.click(calendarButton);
    });
});