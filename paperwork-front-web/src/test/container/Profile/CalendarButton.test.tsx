import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render, configure } from "@testing-library/react";

import CalendarButton from "../../../container/Profile/CalendarButton";

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
    test("should render Calendar button component without crashes", () => { });
});