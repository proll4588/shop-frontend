import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ControlGoodsList from './ControlGoodsList'

describe('<ControlGoodsList />', () => {
    test('it should mount', () => {
        // render(<ControlGoodsList />);

        const controlGoodsList = screen.getByTestId('ControlGoodsList')

        expect(controlGoodsList).toBeInTheDocument()
    })
})
