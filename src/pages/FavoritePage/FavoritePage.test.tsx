import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavoritePage from './FavoritePage';

describe('<FavoritePage />', () => {
  test('it should mount', () => {
    render(<FavoritePage />);
    
    const favoritePage = screen.getByTestId('FavoritePage');

    expect(favoritePage).toBeInTheDocument();
  });
});