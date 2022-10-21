import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IconCard from './IconCard';
import {AiOutlineShoppingCart} from "react-icons/ai";

describe('<IconCard />', () => {
  test('it should mount', () => {
    render(<IconCard to={"/types"} icon={<AiOutlineShoppingCart />}/>);
    
    const iconCard = screen.getByTestId('IconCard');

    expect(iconCard).toBeInTheDocument();
  });
});