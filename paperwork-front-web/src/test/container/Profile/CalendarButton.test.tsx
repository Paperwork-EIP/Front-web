import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";

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

    test('[INTERGRATION TEST] simulate click event on calendar button', async () => {
        try {
            const screen = render(
                <BrowserRouter>
                    <CalendarButton />
                </BrowserRouter>
            );
            const calendarButton = screen.getByRole('button', { name: /calendar\-button/i });

            await fireEvent.click(calendarButton);
        } catch (error) {
            console.log(error);
        }
    });
});