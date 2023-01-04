import React, { useEffect, useState } from 'react'

import ControlLayout from './ControlLayout/ControlLayout'
import ShopLayout from './ShopLayout/ShopLayout'
import appTypesAtom, { appTypes } from './atoms/appType.atom'
import { useRecoilValue } from 'recoil'

const App = () => {
    const appType = useRecoilValue(appTypesAtom)

    return (
        <div className='App'>
            {appType === appTypes.SHOP ? <ShopLayout /> : <ControlLayout />}
        </div>
    )
}

export default App
