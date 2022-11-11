import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoriesList from './CategoriesList';

describe('<CategoriesList />', () => {
  test('it should mount', () => {
    render(<CategoriesList />);
    
    const categoriesList = screen.getByTestId('CategoriesList');

    expect(categoriesList).toBeInTheDocument();
  });
});