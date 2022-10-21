import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ControlGoodsElement from './ControlGoodsElement'

describe('<ControlGoodsElement />', () => {
    test('it should mount', () => {
        // render(<ControlGoodsElement />);

        const controlGoodsElement = screen.getByTestId('ControlGoodsElement')

        expect(controlGoodsElement).toBeInTheDocument()
    })
})
