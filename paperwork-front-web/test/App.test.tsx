import React from "react"
import { BrowserRouter } from "react-router-dom"

import { render } from '@testing-library/react';

import App from "../src/App";

test("should render App component without crashes", () => {
  const screen = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen).not.toBeNull();
})
