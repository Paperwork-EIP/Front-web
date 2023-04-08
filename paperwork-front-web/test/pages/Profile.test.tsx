import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Cookies from 'universal-cookie';
import axios from 'axios';

import Profile from '../../src/pages/Profile';

jest.mock('axios');

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

describe('Profile Tests', () => {
  test('should redirects to login page if loginToken cookie doesn\'t exist', () => {
    const cookies = new Cookies();
    const location = window.location;
    cookies.remove('loginToken');

    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    window.location = location;

    expect(window.location.replace).toBeCalledWith('/');
  });
  // test('renders user information correctly', () => {
  //   render(<Profile />);
  //   expect(screen.getByText('Modify Profile')).toBeInTheDocument();
  //   expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  //   expect(screen.getByText('Username')).toBeInTheDocument();
  //   expect(screen.getByText('Full Name')).toBeInTheDocument();
  //   expect(screen.getByText('Email')).toBeInTheDocument();
  //   expect(screen.getByText('Address')).toBeInTheDocument();
  //   expect(screen.getByText('Phone Number')).toBeInTheDocument();
  //   expect(screen.getByText('Language')).toBeInTheDocument();
  //   expect(screen.getByText('Age')).toBeInTheDocument();
  // });
  // test('renders process information correctly', () => {
  //   const processInfo = [
  //     {
  //       userProcess: {
  //         id: 1,
  //         process_title: 'Process Title'
  //       },
  //       pourcentage: 50
  //     }
  //   ];
  //   render(<Profile userProcessInfo={processInfo} />);
  //   expect(screen.getByText('Process Title')).toBeInTheDocument();
  //   expect(screen.getByText('50%')).toBeInTheDocument();
  // });
});
