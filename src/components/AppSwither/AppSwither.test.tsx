import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppSwither from './AppSwither'

describe('<AppSwither />', () => {
    test('it should mount', () => {
        // render(<AppSwither />);

        const appSwither = screen.getByTestId('AppSwither')

        expect(appSwither).toBeInTheDocument()
    })
})
