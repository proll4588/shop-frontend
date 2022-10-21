import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodCard from './GoodCard'

describe('<GoodCard />', () => {
    test('it should mount', () => {
        // render(
        //     <GoodCard
        //         cost={1000}
        //         name={'Ноутбук'}
        //         photo={
        //             'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig'
        //         }
        //     />
        // )

        const goodCard = screen.getByTestId('GoodCard')

        expect(goodCard).toBeInTheDocument()
    })
})
