import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodsList from './GoodsList'

describe('<GoodsList />', () => {
    test('it should mount', () => {
        // render(<GoodsList />);

        const goodsList = screen.getByTestId('GoodsList')

        expect(goodsList).toBeInTheDocument()
    })
})
