import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DescriptionTab from './DescriptionTab'

describe('<DescriptionTab />', () => {
    test('it should mount', () => {
        // render(<DescriptionTab />);

        const descriptionTab = screen.getByTestId('DescriptionTab')

        expect(descriptionTab).toBeInTheDocument()
    })
})
