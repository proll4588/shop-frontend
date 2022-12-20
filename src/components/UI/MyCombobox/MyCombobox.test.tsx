import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MyCombobox from './MyCombobox'

describe('<MyCombobox />', () => {
    test('it should mount', () => {
        // render(<MyCombobox />);

        const myCombobox = screen.getByTestId('MyCombobox')

        expect(myCombobox).toBeInTheDocument()
    })
})
