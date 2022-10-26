import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Square from './Square'

describe('<Square />', () => {
    test('it should mount', () => {
        // render(<Square />);

        const square = screen.getByTestId('Square')

        expect(square).toBeInTheDocument()
    })
})
