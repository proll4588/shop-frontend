import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodRedactorPage from './GoodRedactorPage';

describe('<GoodRedactorPage />', () => {
  test('it should mount', () => {
    render(<GoodRedactorPage />);
    
    const goodRedactorPage = screen.getByTestId('GoodRedactorPage');

    expect(goodRedactorPage).toBeInTheDocument();
  });
});