import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RatingCreater from './RatingCreater';

describe('<RatingCreater />', () => {
  test('it should mount', () => {
    render(<RatingCreater />);
    
    const ratingCreater = screen.getByTestId('RatingCreater');

    expect(ratingCreater).toBeInTheDocument();
  });
});