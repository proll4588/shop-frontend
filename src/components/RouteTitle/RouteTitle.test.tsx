import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RouteTitle from './RouteTitle'

describe('<RouteTitle />', () => {
    test('it should mount', () => {
        // render(<RouteTitle />);

        const routeTitle = screen.getByTestId('RouteTitle')

        expect(routeTitle).toBeInTheDocument()
    })
})
