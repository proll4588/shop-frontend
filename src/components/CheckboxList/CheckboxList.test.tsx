import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CheckboxList from './CheckboxList'

describe('<CheckboxList />', () => {
    test('it should mount', () => {
        // render(<CheckboxList />);

        const checkboxList = screen.getByTestId('CheckboxList')

        expect(checkboxList).toBeInTheDocument()
    })
})
