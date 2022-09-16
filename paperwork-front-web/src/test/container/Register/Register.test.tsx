import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure } from "@testing-library/react";

import Register from "../../../container/Register/Register";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
})

describe('###### Register page ######', () => {
    test("should render Register page component without crashes", () => { });
});
