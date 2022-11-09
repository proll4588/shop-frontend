import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonalInfoPage from './PersonalInfoPage';

describe('<PersonalInfoPage />', () => {
  test('it should mount', () => {
    render(<PersonalInfoPage />);
    
    const personalInfoPage = screen.getByTestId('PersonalInfoPage');

    expect(personalInfoPage).toBeInTheDocument();
  });
});