import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TypePage from './TypePage';

describe('<TypePage />', () => {
  test('it should mount', () => {
    render(<TypePage />);
    
    const typePage = screen.getByTestId('TypePage');

    expect(typePage).toBeInTheDocument();
  });
});