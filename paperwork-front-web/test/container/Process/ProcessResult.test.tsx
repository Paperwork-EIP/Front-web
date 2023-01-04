import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import ProcessResult from '../../../src/pages/ProcessResult';

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <ProcessResult/>
        </BrowserRouter>
    );
})

// describe("###### Process Result page ######", () => {
//     const screen = render(
//         <BrowserRouter>
//             <ProcessResult/>
//         </BrowserRouter>
//     );

//     it("[UNIT TEST] should render ProcessResult page component without crashes", () => { });

//     it("[UNIT TEST] should have start a new process button", async () => {
//         try {
//             const button = screen.getByRole('button', { name: /start_a_new_process/i });

//         expect(button).toBeInTheDocument();
//         expect(button).toBeVisible();
//         expect(button).toBeTruthy();
//         } catch (error) {
//             console.log(error);
//         }
//     });
// });