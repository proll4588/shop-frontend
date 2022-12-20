import React, { useEffect, useState } from 'react'

import ControlLayout from './ControlLayout/ControlLayout'
import ShopLayout from './ShopLayout/ShopLayout'

export enum appTypes {
    SHOP = 'SHOP',
    CONTROL = 'CONTROL',
}

const App = () => {
    const [appType, setAppType] = useState<appTypes>(appTypes.CONTROL)
    // const [appType, setAppType] = useState<appTypes>(appTypes.SHOP)
    // const appType = appTypes.SHOP

    return (
        <div className='App'>
            {appType === appTypes.SHOP ? <ShopLayout /> : <ControlLayout />}
            {/* <ShopLayout /> */}
        </div>
    )
}

export default App
