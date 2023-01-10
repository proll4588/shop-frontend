import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchCombobox from './SearchCombobox'

describe('<SearchCombobox />', () => {
    test('it should mount', () => {
        // render(<SearchCombobox />);

        const searchCombobox = screen.getByTestId('SearchCombobox')

        expect(searchCombobox).toBeInTheDocument()
    })
})
