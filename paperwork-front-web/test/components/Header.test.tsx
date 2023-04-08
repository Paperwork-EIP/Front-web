import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import axios from 'axios';

import Header from '../../src/components/Header';

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    global.alert = jest.fn();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.get.mockResolvedValueOnce('mockResponse');
    axios.post.mockResolvedValueOnce('mockResponse');
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Header Tests', () => {
    
});