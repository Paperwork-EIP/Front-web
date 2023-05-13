import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import AboutUs from '../../src/pages/AboutUs';

jest.mock('../../src/components/Navbar', () => () => <></>);

beforeEach(() => {
    mockAllIsIntersecting(true);
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('About Us Tests', () => {
    test('should render the page correctly', () => {
        const screen = render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        );

        expect(screen).toBeDefined();
    });
});