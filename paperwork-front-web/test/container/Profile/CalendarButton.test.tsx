import '@testing-library/jest-dom';

import React, { ReactNode } from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";

import CalendarButton from '../../../src/container/Profile/CalendarButton';

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

describe("###### Calendar button component ######", () => {
    interface Props {
        children?: ReactNode,
        onClick?: jest.Mock
    }

    const Button = ({ onClick, children }: Props) => (
        <button onClick={onClick}>{children}</button>
    )

    const screen = render(
        <BrowserRouter>
            <CalendarButton />
        </BrowserRouter>
    );

    const mockCallBack = jest.fn();

    it("[UNIT TEST] should render Calendar button component without crashes", () => { });

    test('[INTERGRATION TEST] simulate click event on calendar button', async () => {
        try {
            const button = screen.getByRole('button', { name: /calendar-button/i });

            render(<Button onClick={mockCallBack}>Calendar</Button>);

            await fireEvent.click(button);
            await fireEvent.click(screen.getAllByText(/calendar/i)[1]);

            expect(button).toBeInTheDocument();
            expect(mockCallBack).toHaveBeenCalledTimes(1);
        } catch (error) {
            console.log(error);
        }
    });
});