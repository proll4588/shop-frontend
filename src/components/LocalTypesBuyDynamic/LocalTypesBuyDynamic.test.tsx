import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LocalTypesBuyDynamic from './LocalTypesBuyDynamic';

describe('<LocalTypesBuyDynamic />', () => {
  test('it should mount', () => {
    render(<LocalTypesBuyDynamic />);
    
    const localTypesBuyDynamic = screen.getByTestId('LocalTypesBuyDynamic');

    expect(localTypesBuyDynamic).toBeInTheDocument();
  });
});