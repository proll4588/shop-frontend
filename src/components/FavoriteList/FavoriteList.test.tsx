import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FavoriteList from './FavoriteList'

describe('<FavoriteList />', () => {
    test('it should mount', () => {
        // render(<FavoriteList />);

        const favoriteList = screen.getByTestId('FavoriteList')

        expect(favoriteList).toBeInTheDocument()
    })
})
