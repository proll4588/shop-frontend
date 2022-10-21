import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FilterPanel from './FilterPanel'

describe('<FilterPanel />', () => {
    test('it should mount', () => {
        // render(<FilterPanel />);

        const filterPanel = screen.getByTestId('FilterPanel')

        expect(filterPanel).toBeInTheDocument()
    })
})
