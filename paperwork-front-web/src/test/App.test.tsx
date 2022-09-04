import React from "react"
import { render } from "./test-utils"
import App from "../App"
import { BrowserRouter } from "react-router-dom"

test("should render App component without crashes", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
})
