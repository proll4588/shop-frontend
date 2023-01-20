import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StatisticTabs from './StatisticTabs'

describe('<StatisticTabs />', () => {
    test('it should mount', () => {
        // render(<StatisticTabs />);

        const statisticTabs = screen.getByTestId('StatisticTabs')

        expect(statisticTabs).toBeInTheDocument()
    })
})
