import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodsPage from './GoodsPage';

describe('<GoodsPage />', () => {
  test('it should mount', () => {
    render(<GoodsPage />);
    
    const goodsPage = screen.getByTestId('GoodsPage');

    expect(goodsPage).toBeInTheDocument();
  });
});