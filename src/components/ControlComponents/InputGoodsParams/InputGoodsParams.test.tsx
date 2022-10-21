import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InputGoodsParams from './InputGoodsParams'

describe('<InputGoodsParams />', () => {
    test('it should mount', () => {
        // render(<InputGoodsParams />);

        const inputGoodsParams = screen.getByTestId('InputGoodsParams')

        expect(inputGoodsParams).toBeInTheDocument()
    })
})
