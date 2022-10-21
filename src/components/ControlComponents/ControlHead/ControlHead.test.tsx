import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ControlHead from './ControlHead';

describe('<ControlHead />', () => {
  test('it should mount', () => {
    render(<ControlHead />);
    
    const controlHead = screen.getByTestId('ControlHead');

    expect(controlHead).toBeInTheDocument();
  });
});