import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, act, fireEvent, getByRole } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';

afterEach(cleanup);

describe('Navbar Component Tests', () => {
    it('should render the component correctly', () => {
        const navbar = render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(navbar).toBeDefined();
    });
    it('should set isShrunk to true when window.scrollY = 0', () => {
        const { container } = render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.scroll(window, { target: { scrollY: 0 } });

        expect(container.getElementsByClassName('Navbar-not-shrunk').length).toBe(1);
        expect(container.getElementsByClassName('Navbar').length).toBe(0);
    });
    it('should set isShrunk to false when window.scrollY > 0', () => {
        const { container } = render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.scroll(window, { target: { scrollY: 100 } });

        expect(container.getElementsByClassName('Navbar-not-shrunk').length).toBe(0);
        expect(container.getElementsByClassName('Navbar').length).toBe(1);
    });
    it('should render the logo', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        const image = getByRole('img');

        expect(image).toHaveAttribute('src', 'logo.png');
        expect(image).toHaveAttribute('alt', 'logo-paperwork');
    });
    it('should change url pathname to / when link clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        act(() => {
            const link = getByTestId('Navbar-link-1');

            link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/');
    });
    it('should change url pathname to /login when link clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        act(() => {
            const link = getByTestId('Navbar-link-2');

            link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/login');
    });
    it('should change url pathname to /register when link clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        act(() => {
            const link = getByTestId('Navbar-link-3');

            link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/register');
    });
    it('should change url pathname to /help when link clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        act(() => {
            const link = getByTestId('Navbar-link-4');

            link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/help');
    });
});