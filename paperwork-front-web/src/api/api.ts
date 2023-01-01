import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });