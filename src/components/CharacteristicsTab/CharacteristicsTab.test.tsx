import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CharacteristicsTab from './CharacteristicsTab'

describe('<CharacteristicsTab />', () => {
    test('it should mount', () => {
        // render(<CharacteristicsTab />);

        const characteristicsTab = screen.getByTestId('CharacteristicsTab')

        expect(characteristicsTab).toBeInTheDocument()
    })
})
