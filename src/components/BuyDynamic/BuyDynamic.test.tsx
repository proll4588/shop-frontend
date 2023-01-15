import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BuyDynamic from './BuyDynamic';

describe('<BuyDynamic />', () => {
  test('it should mount', () => {
    render(<BuyDynamic />);
    
    const buyDynamic = screen.getByTestId('BuyDynamic');

    expect(buyDynamic).toBeInTheDocument();
  });
});