import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TypesRedactor from './TypesRedactor';

describe('<TypesRedactor />', () => {
  test('it should mount', () => {
    render(<TypesRedactor />);
    
    const typesRedactor = screen.getByTestId('TypesRedactor');

    expect(typesRedactor).toBeInTheDocument();
  });
});