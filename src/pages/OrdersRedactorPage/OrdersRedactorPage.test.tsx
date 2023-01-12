import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrdersRedactorPage from './OrdersRedactorPage';

describe('<OrdersRedactorPage />', () => {
  test('it should mount', () => {
    render(<OrdersRedactorPage />);
    
    const ordersRedactorPage = screen.getByTestId('OrdersRedactorPage');

    expect(ordersRedactorPage).toBeInTheDocument();
  });
});