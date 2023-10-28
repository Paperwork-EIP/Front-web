import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { toast } from 'react-toastify';

import axios from 'axios';

import ListEventCalendar from '../../src/components/ListEventCalendar';

jest.mock('axios');
jest.mock('../../src/components/Header', () => () => <></>);

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            replace: jest.fn()
        }
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
    toast.warning = jest.fn();;
    axios.get = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { jwt: "token123" } });
});

afterEach(() => {
    cleanup;
    jest.restoreAllMocks();
});

describe('List Event Calendar', () => {
    it('renders with no events', () => {
        const screen = render(
            <BrowserRouter>
                <ListEventCalendar rdv={[]} adaptedColor="#FF5733" activeCalendarButton={true} language="en" />
            </BrowserRouter>
        );

        expect(screen).not.toBeNull();
    });

    it('renders with events', () => {
        const todayDate = new Date().getDay() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
        const tomorrowDate = new Date().getDay() + 1 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
        const yesterdayDate = new Date().getDay() - 1 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();

        const rdv = [
            {
                key: 1,
                date: `${todayDate}T12:34:56.789Z`,
                process_title: 'Process Title',
                step_title: 'Step Title',
                step_description: 'Step Description'
            },
            {
                key: 2,
                date: `${tomorrowDate}T12:34:56.789Z`,
                process_title: 'Process Title1 ',
                step_title: 'Step Titl3 ',
                step_description: 'Step Description2'
            },
            {
                key: 3,
                date: `${yesterdayDate}T12:34:56.789Z`,
                process_title: 'Process Title 2',
                step_title: 'Step Title3',
                step_description: 'Step Description1'
            }
        ];

        const { getByText } = render(
            <BrowserRouter>
                <ListEventCalendar rdv={rdv} adaptedColor="#FF5733" activeCalendarButton={true} language="en" />
            </BrowserRouter>
        );

        expect(getByText('Process Title - Step Title')).toBeInTheDocument();
        expect(getByText('Step Description')).toBeInTheDocument();

        expect(getByText('Process Title1 - Step Titl3')).toBeInTheDocument();
        expect(getByText('Step Description2')).toBeInTheDocument();

        expect(getByText('Process Title 2 - Step Title3')).toBeInTheDocument();
        expect(getByText('Step Description1')).toBeInTheDocument();
    });
});