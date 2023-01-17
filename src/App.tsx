import React, { useEffect, useState } from 'react'

import ControlLayout from './ControlLayout/ControlLayout'
import ShopLayout from './ShopLayout/ShopLayout'
import appTypesAtom, { appTypes } from './atoms/appType.atom'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { ADD_VISIT } from './apollo/fetchs'

const App = () => {
    const appType = useRecoilValue(appTypesAtom)
    const [visit] = useMutation(ADD_VISIT)

    // useEffect(() => {
    //     visit()
    // }, [])

    return (
        <div className='App'>
            {appType === appTypes.SHOP ? <ShopLayout /> : <ControlLayout />}
        </div>
    )
}

export default App
