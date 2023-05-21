import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, act } from '@testing-library/react';

import Cookies from 'universal-cookie';

import WelcomePage from '../../src/pages/Welcome';

jest.mock('../../src/components/Navbar', () => () => <></>);

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Welcome Page Tests', () => {
    it('should render the page correctly', () => {
        const { getByTestId } = render(<Router><WelcomePage /></Router>);

        expect(getByTestId('Header-description-button')).toBeInTheDocument();
        expect(getByTestId("Footer-title")).toBeInTheDocument()
        expect(getByTestId("Footer-infos")).toBeInTheDocument()
    });
    it('should render the images', () => {
        const { getAllByRole } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );
        const image = getAllByRole('img');

        expect(image).not.toBeNull();
    });
    it('should link to the login page when start button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        act(() => {
            const button = getByTestId('Header-description-button');

            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/login');
    });
    it('should link to the about page when about button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        act(() => {
            const button = getByTestId('Footer-about-link');

            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/aboutus');
    });
    it('should link to the contact page when contact button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        act(() => {
            const button = getByTestId('Footer-register-link');

            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/register');
    });
    it('should link to the login page when login button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        act(() => {
            const button = getByTestId('Footer-login-link');

            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/login');
    });
    it('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/home');
    });
    it('should redirects to home page if loginToken cookie exists', () => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { replace: jest.fn() }
        });

        const cookies = new Cookies();
        const location = window.location;

        cookies.set('loginToken', 'test');

        render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        cookies.remove('loginToken');
        window.location = location;

        expect(window.location.replace).toHaveBeenCalledWith('/home');
    });
    it('should not redirects to login page if loginToken cookie not exists', () => {
        const cookies = new Cookies();
        cookies.remove('loginToken');

        render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        expect(window.location.pathname).not.toEqual('/home');
    });
    it('should redirects to home page if loginToken cookie exists', () => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { replace: jest.fn() }
        });

        const cookies = new Cookies();
        const location = window.location;

        cookies.set('loginToken', 'test');

        render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        cookies.remove('loginToken');
        window.location = location;

        expect(window.location.replace).toHaveBeenCalledWith('/home');
    });
});