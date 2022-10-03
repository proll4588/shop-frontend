import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodsTypeList from './GoodsTypeList';

describe('<GoodsTypeList />', () => {
  test('it should mount', () => {
    render(<GoodsTypeList />);
    
    const goodsTypeList = screen.getByTestId('GoodsTypeList');

    expect(goodsTypeList).toBeInTheDocument();
  });
});