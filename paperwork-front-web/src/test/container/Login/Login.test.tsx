import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";
import user from "@testing-library/user-event";
import mockFetch from '../../mocks/api/api';
import LoginContent from '../../../container/Login/LoginContent';
import React from 'react';

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
    test("should render Login page component without crashes", () => { });
});