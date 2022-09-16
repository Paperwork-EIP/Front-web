import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, configure } from "@testing-library/react";

import ProcessBar from "../../../container/Profile/ProcessBar";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <ProcessBar />
        </BrowserRouter>
    );
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("###### Process bar component ######", () => {
    test("should render Process bar component without crashes", () => { });
});