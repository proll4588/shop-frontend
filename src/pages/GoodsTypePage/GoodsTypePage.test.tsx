import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodsTypePage from './GoodsTypePage';

describe('<GoodsTypePage />', () => {
  test('it should mount', () => {
    render(<GoodsTypePage />);
    
    const goodsTypePage = screen.getByTestId('GoodsTypePage');

    expect(goodsTypePage).toBeInTheDocument();
  });
});