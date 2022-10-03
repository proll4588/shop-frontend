import React, { useState } from 'react'
import { GET_GOODS } from './apollo/fetchs'
import { useQuery } from '@apollo/client'
import ShopLayout from './ShopLayout/ShopLayout'
import ControlLayout from './ControlLayout/ControlLayout'
import GoodsTypeCard from './components/GoodsTypeCard/GoodsTypeCard'
import GoodsTypeList from './components/GoodsTypeList/GoodsTypeList'

export enum appTypes {
    shop = 'SHOP',
    control = 'CONTROL',
}

const goodsTypeListData = [
    {
        id: 0,
        name: 'Компьютеры комплектующие ноутбуки',
        // photo: 'https://avatars.mds.yandex.net/get-mpic/5255532/img_id989969909136794952.jpeg/orig',
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

const App = () => {
    const [appType, setAppType] = useState<appTypes>(appTypes.shop)
    // const { loading, error, data } = useQuery(GET_GOODS)

    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error :(</p>

    return (
        <div className='App'>
             {appType === appTypes.shop ? <ShopLayout /> : <ControlLayout />}
            {/*<GoodsTypeList data={goodsTypeListData} />*/}
        </div>
    )
}

export default App
