import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodDescriptionRedactor from './GoodDescriptionRedactor'

describe('<GoodDescriptionRedactor />', () => {
    test('it should mount', () => {
        // render(<GoodDescriptionRedactor />);

        const goodDescriptionRedactor = screen.getByTestId(
            'GoodDescriptionRedactor'
        )

        expect(goodDescriptionRedactor).toBeInTheDocument()
    })
})
