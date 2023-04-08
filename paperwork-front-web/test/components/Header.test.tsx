import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, getByLabelText } from '@testing-library/react';

import axios from 'axios';
import Cookies from 'universal-cookie';

import Header from '../../src/components/Header';

jest.mock('axios');

const cookies = new Cookies();

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    axios.get = jest.fn().mockImplementation(() => Promise.resolve());
    axios.post = jest.fn().mockImplementation(() => Promise.resolve());
    axios.get.mockResolvedValueOnce('mockResponse');
    axios.post.mockResolvedValueOnce('mockResponse');
    cookies.set('loginToken', 'test');
});

afterEach(() => {
    cookies.remove('loginToken');
    cleanup;
    jest.restoreAllMocks();
});

describe('Header Tests', () => {
    test('should display Paperwork logo', () => {
        const { getByAltText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logo = getByAltText('logo-paperwork-header');
        expect(logo).toBeInTheDocument();
    });
    test('should link to the quiz page when quiz button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const linkElement = getByTestId('link-quiz');
        expect(linkElement).toHaveAttribute('href', '/quiz');
    });
    test('should switch mode when mode button clicked', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-mode/i));

        expect(button).toBeTruthy();
    });
    test('should open modal when avatar button clicked', () => {
        const { getByLabelText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = fireEvent.click(getByLabelText(/button-open-modal/i));

        expect(button).toBeTruthy();
    });
    // test('should link to the home page when home button clicked', () => {
    //     const { getByTestId, getByRole, getByText } = render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     const linkElement = getByTestId('link-home');
    //     expect(linkElement).toHaveAttribute('href', '/home');

    //     const icon = getByRole('img', { name: 'Home' });
    //     expect(icon).toBeInTheDocument();

    //     const text = getByText('Home');
    //     expect(text).toBeInTheDocument();
    // });
    // test('should link to the profile page when profile button clicked', () => {
    //     const { getByTestId } = render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     const linkElement = getByTestId('link-profile');
    //     expect(linkElement).toHaveAttribute('href', '/profile');
    // });
    // test('should link to the calendar page when calendar button clicked', () => {
    //     const { getByTestId } = render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     const linkElement = getByTestId('link-calendar');
    //     expect(linkElement).toHaveAttribute('href', '/calendar');
    // });
    // test('should link to the help page when help button clicked', () => {
    //     const { getByTestId } = render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     const linkElement = getByTestId('link-help');
    //     expect(linkElement).toHaveAttribute('href', '/help');
    // });
});