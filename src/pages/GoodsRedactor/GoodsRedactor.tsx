import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { GET_GOODS } from '../../apollo/fetchs'
import ControlGoodsList from '../../components/ControlComponents/ControlGoodsList/ControlGoodsList'
import Input from '../../components/UI/Input/Input'
import styles from './GoodsRedactor.module.scss'
import GoodsRedactorProps from './GoodsRedactor.props'

const AddElement = () => {
    return <div className={styles.AddElement}> Добавить новый товар </div>
}

const GoodsRedactor: FC<GoodsRedactorProps> = () => {
    const [search, setSearch] = useState<string | null>('')
    const { loading, error, data } = useQuery(GET_GOODS, {
        variables: {
            search: search,
        },
    })

    const searchHandler = (e) => {
        setSearch(e)
    }

    if (data) console.log(data)

    return (
        <div className={styles.GoodsRedactor}>
            <div className={styles.GoodsRedactor__container}>
                {/* TODO:Сделать задержку поиска */}
                <Input
                    onChange={searchHandler}
                    placeholder='Поиск по названию или id товара'
                    value={search}
                    type='text'
                />
                {!loading && !error && !!data.getGoods.length ? (
                    <ControlGoodsList data={data.getGoods} />
                ) : (
                    ''
                )}
                <AddElement />
            </div>
        </div>
    )
}

export default GoodsRedactor
