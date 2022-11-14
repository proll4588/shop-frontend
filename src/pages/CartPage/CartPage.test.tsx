import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartPage from './CartPage';

describe('<CartPage />', () => {
  test('it should mount', () => {
    render(<CartPage />);
    
    const cartPage = screen.getByTestId('CartPage');

    expect(cartPage).toBeInTheDocument();
  });
});