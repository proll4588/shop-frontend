import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodsRedactor from './GoodsRedactor';

describe('<GoodsRedactor />', () => {
  test('it should mount', () => {
    render(<GoodsRedactor />);
    
    const goodsRedactor = screen.getByTestId('GoodsRedactor');

    expect(goodsRedactor).toBeInTheDocument();
  });
});