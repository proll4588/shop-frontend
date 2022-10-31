import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodDescriptionPanel from './GoodDescriptionPanel'

describe('<GoodDescriptionPanel />', () => {
    test('it should mount', () => {
        // render(<GoodDescriptionPanel />);

        const goodDescriptionPanel = screen.getByTestId('GoodDescriptionPanel')

        expect(goodDescriptionPanel).toBeInTheDocument()
    })
})
