import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Dropdown from './Dropdown'

describe('<Dropdown />', () => {
    test('it should mount', () => {
        // render(<Dropdown content={['1', '1', '1', '1', '1', '1', '1', '1']} />)

        const dropdown = screen.getByTestId('Dropdown')

        expect(dropdown).toBeInTheDocument()
    })
})
