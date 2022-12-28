import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodPhotoRedactor from './GoodPhotoRedactor'

describe('<GoodPhotoRedactor />', () => {
    test('it should mount', () => {
        // render(<GoodPhotoRedactor />);

        const goodPhotoRedactor = screen.getByTestId('GoodPhotoRedactor')

        expect(goodPhotoRedactor).toBeInTheDocument()
    })
})
