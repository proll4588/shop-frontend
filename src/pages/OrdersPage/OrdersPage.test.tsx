import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrdersPage from './OrdersPage';

describe('<OrdersPage />', () => {
  test('it should mount', () => {
    render(<OrdersPage />);
    
    const ordersPage = screen.getByTestId('OrdersPage');

    expect(ordersPage).toBeInTheDocument();
  });
});