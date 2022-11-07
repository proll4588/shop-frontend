import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserNav from './UserNav'

describe('<UserNav />', () => {
    test('it should mount', () => {
        // render(<UserNav />);

        const userNav = screen.getByTestId('UserNav')

        expect(userNav).toBeInTheDocument()
    })
})
