import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RatingWiever from './RatingWiever'

describe('<RatingWiever />', () => {
    test('it should mount', () => {
        // render(<RatingWiever />);

        const ratingWiever = screen.getByTestId('RatingWiever')

        expect(ratingWiever).toBeInTheDocument()
    })
})
