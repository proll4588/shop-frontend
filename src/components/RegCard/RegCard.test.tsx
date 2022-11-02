import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RegCard from './RegCard'

describe('<RegCard />', () => {
    test('it should mount', () => {
        // render(<RegCard />);

        const regCard = screen.getByTestId('RegCard')

        expect(regCard).toBeInTheDocument()
    })
})
