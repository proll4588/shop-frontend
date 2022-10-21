import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TypesList from './TypesList';

describe('<TypesList />', () => {
  test('it should mount', () => {
    // render(<TypesList />);
    
    const typesList = screen.getByTestId('TypesList');

    expect(typesList).toBeInTheDocument();
  });
});