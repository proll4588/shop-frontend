import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Stars from './Stars'

describe('<Stars />', () => {
    test('it should mount', () => {
        // render(<Stars />);

        const stars = screen.getByTestId('Stars')

        expect(stars).toBeInTheDocument()
    })
})
