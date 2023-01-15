import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GlobalTypesBuyDynamic from './GlobalTypesBuyDynamic';

describe('<GlobalTypesBuyDynamic />', () => {
  test('it should mount', () => {
    render(<GlobalTypesBuyDynamic />);
    
    const globalTypesBuyDynamic = screen.getByTestId('GlobalTypesBuyDynamic');

    expect(globalTypesBuyDynamic).toBeInTheDocument();
  });
});