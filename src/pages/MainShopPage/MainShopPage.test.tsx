import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainShopPage from './MainShopPage';

describe('<MainShopPage />', () => {
  test('it should mount', () => {
    render(<MainShopPage />);
    
    const mainShopPage = screen.getByTestId('MainShopPage');

    expect(mainShopPage).toBeInTheDocument();
  });
});