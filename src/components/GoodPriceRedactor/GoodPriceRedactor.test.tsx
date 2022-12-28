import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodPriceRedactor from './GoodPriceRedactor'

describe('<GoodPriceRedactor />', () => {
    test('it should mount', () => {
        // render(<GoodPriceRedactor />);

        const goodPriceRedactor = screen.getByTestId('GoodPriceRedactor')

        expect(goodPriceRedactor).toBeInTheDocument()
    })
})
