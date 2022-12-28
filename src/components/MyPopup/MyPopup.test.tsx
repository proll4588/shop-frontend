import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MyPopup from './MyPopup'

describe('<MyPopup />', () => {
    test('it should mount', () => {
        // render(<MyPopup />);

        const myPopup = screen.getByTestId('MyPopup')

        expect(myPopup).toBeInTheDocument()
    })
})
