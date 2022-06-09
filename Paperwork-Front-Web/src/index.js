import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      {/* All available routes. If you need to add new route(s), put it in the Routes component */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route
        path="*"
        element={<Error />}
        options={{ status: 404 }}
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);