import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodsTypeCard from './GoodsTypeCard';

describe('<GoodsTypeCard />', () => {
  test('it should mount', () => {
    render(<GoodsTypeCard />);
    
    const goodsTypeCard = screen.getByTestId('GoodsTypeCard');

    expect(goodsTypeCard).toBeInTheDocument();
  });
});