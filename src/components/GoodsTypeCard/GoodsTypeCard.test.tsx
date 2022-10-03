import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodsTypeCard from './GoodsTypeCard'

describe('<GoodsTypeCard />', () => {
    test('it should mount', () => {
        render(
            <GoodsTypeCard
                name='Компудахтеры'
                photo='https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig'
                href='/'
            />
        )

        const goodsTypeCard = screen.getByTestId('GoodsTypeCard')

        expect(goodsTypeCard).toBeInTheDocument()
    })
})
