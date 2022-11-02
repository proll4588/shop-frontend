import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginCard from './LoginCard'

describe('<LoginCard />', () => {
    test('it should mount', () => {
        // render(<LoginCard />);

        const loginCard = screen.getByTestId('LoginCard')

        expect(loginCard).toBeInTheDocument()
    })
})
