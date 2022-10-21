import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodCardTypeSwitcher from './GoodCardTypeSwitcher';

describe('<GoodCardTypeSwitcher />', () => {
  test('it should mount', () => {
    render(<GoodCardTypeSwitcher />);
    
    const goodCardTypeSwitcher = screen.getByTestId('GoodCardTypeSwitcher');

    expect(goodCardTypeSwitcher).toBeInTheDocument();
  });
});