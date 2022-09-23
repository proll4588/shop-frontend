import React from 'react'
import { GET_GOODS } from './apollo/fetchs'
import { useQuery } from '@apollo/client'

const App = () => {
    const { loading, error, data } = useQuery(GET_GOODS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div className='123'>
            {data.goods.map((good: any) => (
                <>
                    <div>{good.gcName}</div>
                    <div>{good.gcDescription}</div>
                    <div>{good.gcCost}</div>
                </>
            ))}
        </div>
    )
}

export default App
