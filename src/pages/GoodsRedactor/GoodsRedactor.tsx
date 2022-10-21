import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_GOODS } from '../../apollo/fetchs'
import ControlGoodsList from '../../components/ControlComponents/ControlGoodsList/ControlGoodsList'
import Input from '../../components/UI/Input/Input'
import styles from './GoodsRedactor.module.scss'
import GoodsRedactorProps from './GoodsRedactor.props'

const GoodsRedactor: FC<GoodsRedactorProps> = () => {
    const [search, setSearch] = useState<string | null>('')
    const { loading, error, data } = useQuery(GET_GOODS, {
        variables: {
            search: search,
        },
    })

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.GoodsRedactor}>
            <div className={styles.GoodsRedactor__container}>
                <Input
                    onChange={searchHandler}
                    value={search}
                    type='text'
                />
                {!loading && !error ? (
                    <ControlGoodsList data={data.goods} />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default GoodsRedactor
