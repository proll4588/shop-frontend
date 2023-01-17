import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubTypesBuyDynamic from './SubTypesBuyDynamic';

describe('<SubTypesBuyDynamic />', () => {
  test('it should mount', () => {
    render(<SubTypesBuyDynamic />);
    
    const subTypesBuyDynamic = screen.getByTestId('SubTypesBuyDynamic');

    expect(subTypesBuyDynamic).toBeInTheDocument();
  });
});