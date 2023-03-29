import React from 'react';
import { BrowserRouter, MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, act } from '@testing-library/react';
import WelcomePage from '../../src/pages/Welcome';

afterEach(cleanup);

describe('Welcome Page Tests', () => {
    it('should render the page correctly', () => {
        const { getByText, getAllByText, getByTestId } = render(<Router><WelcomePage /></Router>);

        expect(getAllByText('Paperwork').length).not.toEqual(0);
        expect(getByText('A tool to help you for the most annoying task.')).toBeInTheDocument();
        expect(getByTestId('Header-description-button')).toBeInTheDocument();

        expect(getByText('What is Paperwork ?')).toBeInTheDocument();
        expect(getByText('An app to help you for your administrative tasks')).toBeInTheDocument();

        expect(getByText('Tired of paperwork ?')).toBeInTheDocument();

        expect(getByText('A quiz to save time')).toBeInTheDocument();
        expect(getByText('Thanks to our quiz, you will know exactly the steps to follow for the desired procedure.')).toBeInTheDocument();

        expect(getByText('Stay alerted to remind you your unfinshed tasks')).toBeInTheDocument();
        expect(getByText("Your progress is saved for each step you start and receive notifications directly in the mobile application to inform you of your steps to be completed and your next appointments.")).toBeInTheDocument();

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

        expect(image.length).toEqual(5);

        expect(image[0]).toHaveAttribute('src', 'logo.png');
        expect(image[0]).toHaveAttribute('alt', 'logo-paperwork');

        expect(image[1]).toHaveAttribute('src', 'assets/welcome-page/tiredness-animate.svg');
        expect(image[1]).toHaveAttribute('alt', 'tiredness_image');

        expect(image[2]).toHaveAttribute('src', 'assets/welcome-page/done-animate.svg');
        expect(image[2]).toHaveAttribute('alt', 'done_image');

        expect(image[3]).toHaveAttribute('src', 'assets/welcome-page/accessible-phone-animate.svg');
        expect(image[3]).toHaveAttribute('alt', 'accessible_from_phone_image');
        
        expect(image[4]).toHaveAttribute('src', 'logo.png');
        expect(image[4]).toHaveAttribute('alt', 'logo-paperwork');
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

        expect(window.location.pathname).toBe('/about');
    });
    it('should link to the contact page when contact button clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );

        act(() => {
            const button = getByTestId('Footer-contact-link');

            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(window.location.pathname).toBe('/contact');
    });
});