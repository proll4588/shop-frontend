import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LabelInput from './LabelInput'

describe('<LabelInput />', () => {
    test('it should mount', () => {
        // render(<LabelInput />);

        const labelInput = screen.getByTestId('LabelInput')

        expect(labelInput).toBeInTheDocument()
    })
})
