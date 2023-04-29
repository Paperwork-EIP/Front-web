import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import AboutUs from '../../src/pages/AboutUs';

jest.mock('../../src/components/Navbar', () => () => <></>);

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('About Us Tests', () => {
    test('', () => {
        const screen = render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        );

        expect(screen).toBeDefined();
    });
});