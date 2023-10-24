import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";

import App from './App';

import 'react-calendar/dist/Calendar.css';
import "./i18n/i18n";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
