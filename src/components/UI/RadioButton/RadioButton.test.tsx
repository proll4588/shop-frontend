import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RadioButton from './RadioButton'

describe('<RadioButton />', () => {
    test('it should mount', () => {
        // render(<RadioButton />);

        const radioButton = screen.getByTestId('RadioButton')

        expect(radioButton).toBeInTheDocument()
    })
})
