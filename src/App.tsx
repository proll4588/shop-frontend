import React, { useState } from 'react'
import { GET_GOODS } from './apollo/fetchs'
import { useQuery } from '@apollo/client'
import ShopLayout from './ShopLayout/ShopLayout'
import ControlLayout from './ControlLayout/ControlLayout'

export enum appTypes {
    shop = 'SHOP',
    control = 'CONTROL',
}

const App = () => {
    const [appType, setAppType] = useState<appTypes>(appTypes.shop)
    // const { loading, error, data } = useQuery(GET_GOODS)

    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error :(</p>

    return (
        <div className='App'>
            {appType === appTypes.shop ? <ShopLayout /> : <ControlLayout />}
        </div>
    )
}

export default App
