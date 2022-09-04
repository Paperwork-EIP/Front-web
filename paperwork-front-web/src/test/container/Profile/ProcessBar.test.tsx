import '@testing-library/jest-dom/extend-expect';

import { render, screen, configure, within } from "@testing-library/react";
import React from 'react';

import ProcessBar from "../../../container/Profile/ProcessBar";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Process bar component", () => {
    test("renders without crashing", () => {
        render(
            <ProcessBar />
        );
    });
});

describe("Valid unit tests", () => {
    test('should have a box container', () => {
        render(<ProcessBar />);

        const box = screen.getByText(/your current process/i);

        expect(box).toBeInTheDocument();
    });

    test('should have a processbar', () => {
        render(<ProcessBar />);

        const processbar = screen.getAllByRole('progressbar');

        for (let i = 0; i < processbar.length; i++) {
            expect(processbar[i]).toBeInTheDocument();
        }
    });
});

describe("Valid integration tests", () => {
    test('should display the Chakra UI Process Bar component', () => {
        render(<ProcessBar />);

        const box = screen.getByText(/your current process/i);

        expect(box).toBeTruthy();
        expect(box).toHaveClass('Profil-ProcessBox', { exact: false });
        expect(box).toHaveClass('Profil-ProcessBox css-0'), { exact: true };
        expect(box).toHaveTextContent('Your current process');

        const processbar = within(box).getAllByRole('progressbar', { exact: true });

        for (let i = 0; i < processbar.length; i++) {
            expect(processbar[i]).toBeTruthy();
            expect(processbar[i]).toBeInTheDocument();
            expect(processbar[i]).toHaveClass('css-1jy0d03', { exact: true });
            expect(processbar[i]).toBeVisible();
        }
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////
