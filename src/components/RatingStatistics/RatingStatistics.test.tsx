import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RatingStatistics from './RatingStatistics'

describe('<RatingStatistics />', () => {
    test('it should mount', () => {
        // render(<RatingStatistics />);

        const ratingStatistics = screen.getByTestId('RatingStatistics')

        expect(ratingStatistics).toBeInTheDocument()
    })
})
