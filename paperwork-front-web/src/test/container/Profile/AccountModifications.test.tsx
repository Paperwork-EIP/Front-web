import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure } from "@testing-library/react";

import AccountModifications from "../../../container/Profile/AccountModifications";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <AccountModifications />
        </BrowserRouter>
    );
})

describe("###### Account modification page ######", () => {
    it("should render Account modification component without crashes", () => { });
});