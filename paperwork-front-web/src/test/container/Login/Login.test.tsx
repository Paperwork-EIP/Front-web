import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure } from "@testing-library/react";

import LoginContent from '../../../container/Login/LoginContent';

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    render(
        <BrowserRouter>
            <LoginContent />
        </BrowserRouter>
    );
})

describe("###### Login page ######", () => {
    it("should render Login page component without crashes", () => { });
});