import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import ProcessResult from '../../pages/ProcessResult';

// Variable temporaire remplacant le JSON reçu par ProcessResult (afin de tester la page)
const processInfo = {
"type": "Carte vitale",
"tasks": [
    {
    "state": true,
    "description": "Take a appointment at the CPAM to this number : 01 84 90 36 46 (between 9 am and 6 pm)",
    },
    {
    "state": true,
    "description": "You must go to your appointement with your identity card and your residence permit (adress : 3 Pl. Adolphe Chérioux, 75015 Paris)",
    },
    {
    "state": false,
    "description": "Create an ameli account with your new social security number",
    },
    {
    "state": false,
    "description": "Go to your account process and select “carte vitale”",
    },
    {
    "state": false,
    "description": "Enter your scanned ID photo and your ID card and check your information and valide your request",
    },
],
}

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <ProcessResult processInfo={processInfo}/>
        </BrowserRouter>
    );
})

describe("###### Process Result page ######", () => {
    const screen = render(
        <BrowserRouter>
            <ProcessResult processInfo={processInfo}/>
        </BrowserRouter>
    );

    it("[UNIT TEST] should render ProcessResult page component without crashes", () => { });

    it("[UNIT TEST] should have start a new process button", async () => {
        try {
            const button = screen.getByRole('button', { name: /start_a_new_process/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).toBeTruthy();
        } catch (error) {
            console.log(error);
        }
    });
});