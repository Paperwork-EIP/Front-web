import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import Error from '../../src/pages/Error';

jest.mock('../../src/components/Navbar', () => () => <></>);

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('About Us Tests', () => {
    test('', () => {
        const screen = render(
            <BrowserRouter>
                <Error />
            </BrowserRouter>
        );

        expect(screen).toBeDefined();
    });
});