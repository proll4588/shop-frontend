import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GoodsTypeList from './GoodsTypeList'

const goodsTypeListData = [
    {
        id: 0,
        name: 'Компудахтеры',
        photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
        href: '/',
    },
    {
        id: 1,
        name: 'Компудахтеры',
        photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
        href: '/',
    },
    {
        id: 2,
        name: 'Компудахтеры',
        photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
        href: '/',
    },
    {
        id: 3,
        name: 'Компудахтеры',
        photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
        href: '/',
    },
    {
        id: 4,
        name: 'Компудахтеры',
        photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
        href: '/',
    },
]

describe('<GoodsTypeList />', () => {
    test('it should mount', () => {
        render(<GoodsTypeList data={goodsTypeListData} />)

        const goodsTypeList = screen.getByTestId('GoodsTypeList')

        expect(goodsTypeList).toBeInTheDocument()
    })
})
