import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NumberInput from './NumberInput'

describe('<NumberInput />', () => {
    test('it should mount', () => {
        // render(<NumberInput />);

        const numberInput = screen.getByTestId('NumberInput')

        expect(numberInput).toBeInTheDocument()
    })
})
