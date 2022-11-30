import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckoutPage from './CheckoutPage';

describe('<CheckoutPage />', () => {
  test('it should mount', () => {
    render(<CheckoutPage />);
    
    const checkoutPage = screen.getByTestId('CheckoutPage');

    expect(checkoutPage).toBeInTheDocument();
  });
});