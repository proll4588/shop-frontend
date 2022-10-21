import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { GET_ALL_GOODS_TYPES } from '../../apollo/fetchs'
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel'
import styles from './MainShopPage.module.scss'
import MainShopPageProps from './MainShopPage.props'

const MainShopPage: FC<MainShopPageProps> = () => {
    const { loading, error, data } = useQuery(GET_ALL_GOODS_TYPES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div className={styles.MainShopPage}>
            <div className={styles.MainShopPage__container}>
                <CategoriesPanel
                    globalGoodsTypes={data.types}
                    lock
                    startSelect
                />
            </div>
        </div>
    )
}

export default MainShopPage
