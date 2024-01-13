import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Lexicon from '../../src/pages/Lexicon';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            assign: jest.fn().mockImplementation(() => Promise.resolve()),
            replace: jest.fn().mockImplementation(() => Promise.resolve())
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    axios.get = jest.fn().mockImplementation(() => Promise.resolve());
    axios.post = jest.fn().mockImplementation(() => Promise.resolve());
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('Lexicon Tests', () => {
    it('should toggle FAQ', async () => {
        const cookies = new Cookies();
        cookies.set('loginToken', { token: 'token123' });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, jest.fn()]);

        const { getAllByTestId } = render(
            <BrowserRouter>
                <Lexicon />
            </BrowserRouter>
        );

        const faqButtons = getAllByTestId('faq-button');
        expect(faqButtons).not.toBeNull();

        fireEvent.click(faqButtons[0]);

        await waitFor(() => {
            expect(useStateSpy).toHaveBeenCalled();

            fireEvent.click(faqButtons[0]);

            expect(useStateSpy).toHaveBeenCalled();
        });
    });
});
