import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SupplyPage from './SupplyPage';

describe('<SupplyPage />', () => {
  test('it should mount', () => {
    render(<SupplyPage />);
    
    const supplyPage = screen.getByTestId('SupplyPage');

    expect(supplyPage).toBeInTheDocument();
  });
});