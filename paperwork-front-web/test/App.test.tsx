import React from "react"
import { render } from "./test-utils"
import { BrowserRouter } from "react-router-dom"
import App from "../src/App";

test("should render App component without crashes", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
})
