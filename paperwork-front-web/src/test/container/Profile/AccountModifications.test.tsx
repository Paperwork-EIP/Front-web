import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, configure } from "@testing-library/react";

import AccountModifications from "../../../container/Profile/AccountModifications";

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

/////////////////////////// VALID CASE TESTS ///////////////////////////

describe("Account modification page", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <AccountModifications />
            </BrowserRouter>
        );
    });
});

/////////////////////////// INVALID CASE TESTS ///////////////////////////