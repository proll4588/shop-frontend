import React, { FC, useState } from 'react'
import styles from './SearchCombobox.module.scss'
import SearchComboboxProps from './SearchCombobox.props'
import MyCombobox from '../UI/MyCombobox/MyCombobox'
import { GET_GOODS } from '../../apollo/fetchs'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

export const SearchCombobox: FC<SearchComboboxProps> = () => {
    const [query, setQuery] = useState('')
    const nav = useNavigate()

    const select = (id) => {
        if (id !== -1) nav(`/good/${id}`)
    }

    const { data, error, loading } = useQuery(GET_GOODS, {
        variables: {
            search: query,
            take: 5,
        },
    })

    return (
        <div className={styles.SearchCombobox}>
            <div className={styles.SearchCombobox__container}>
                <MyCombobox
                    elements={data ? data.getGoods.goods : []}
                    onQuering={setQuery}
                    onSelect={select}
                    loading={loading || !!error}
                    placeholder='Поиск'
                    disableButton
                />
            </div>
        </div>
    )
}

export default SearchCombobox
