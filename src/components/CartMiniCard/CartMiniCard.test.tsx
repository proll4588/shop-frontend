import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CartMiniCard from './CartMiniCard'

describe('<CartMiniCard />', () => {
    test('it should mount', () => {
        // render(<CartMiniCard />);

        const cartMiniCard = screen.getByTestId('CartMiniCard')

        expect(cartMiniCard).toBeInTheDocument()
    })
})
