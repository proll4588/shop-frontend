import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserRating from './UserRating'

describe('<UserRating />', () => {
    test('it should mount', () => {
        // render(<UserRating />);

        const userRating = screen.getByTestId('UserRating')

        expect(userRating).toBeInTheDocument()
    })
})
