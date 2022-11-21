import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CartMiniCardList from './CartMiniCardList'

describe('<CartMiniCardList />', () => {
    test('it should mount', () => {
        // render(<CartMiniCardList />);

        const cartMiniCardList = screen.getByTestId('CartMiniCardList')

        expect(cartMiniCardList).toBeInTheDocument()
    })
})
