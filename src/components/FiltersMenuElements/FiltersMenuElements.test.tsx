import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FiltersMenuElements from './FiltersMenuElements'

describe('<FiltersMenuElements />', () => {
    test('it should mount', () => {
        // render(<FiltersMenuElements />);

        const filtersMenuElements = screen.getByTestId('FiltersMenuElements')

        expect(filtersMenuElements).toBeInTheDocument()
    })
})
