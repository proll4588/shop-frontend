import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountPage from './AccountPage';

describe('<AccountPage />', () => {
  test('it should mount', () => {
    render(<AccountPage />);
    
    const accountPage = screen.getByTestId('AccountPage');

    expect(accountPage).toBeInTheDocument();
  });
});