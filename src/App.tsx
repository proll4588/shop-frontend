import React, { useState } from 'react'

import ControlLayout from './ControlLayout/ControlLayout'
import ShopLayout from './ShopLayout/ShopLayout'

export enum appTypes {
    SHOP = 'SHOP',
    CONTROL = 'CONTROL',
}

const App = () => {
    const [appType, setAppType] = useState<appTypes>(appTypes.SHOP)

    return (
        <div className='App'>
            {appType === appTypes.SHOP ? <ShopLayout /> : <ControlLayout />}
        </div>
    )
}

export default App
