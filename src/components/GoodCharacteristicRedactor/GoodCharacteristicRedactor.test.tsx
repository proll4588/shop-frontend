import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodCharacteristicRedactor from './GoodCharacteristicRedactor'

describe('<GoodCharacteristicRedactor />', () => {
    test('it should mount', () => {
        // render(<GoodCharacteristicRedactor />);

        const goodCharacteristicRedactor = screen.getByTestId(
            'GoodCharacteristicRedactor'
        )

        expect(goodCharacteristicRedactor).toBeInTheDocument()
    })
})
