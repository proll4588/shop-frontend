import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavoriteButton from './FavoriteButton';

describe('<FavoriteButton />', () => {
  test('it should mount', () => {
    render(<FavoriteButton />);
    
    const favoriteButton = screen.getByTestId('FavoriteButton');

    expect(favoriteButton).toBeInTheDocument();
  });
});