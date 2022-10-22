import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodPage from './GoodPage';

describe('<GoodPage />', () => {
  test('it should mount', () => {
    render(<GoodPage />);
    
    const goodPage = screen.getByTestId('GoodPage');

    expect(goodPage).toBeInTheDocument();
  });
});