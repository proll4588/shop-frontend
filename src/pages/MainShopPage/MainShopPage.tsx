/* Хуки */
import { useQuery } from '@apollo/client'
import React, { FC } from 'react'

/* Компоненты */
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel'

/* Запросы */
import { GET_ALL_GOODS_TYPES, IGetAllGoodsTypes } from '../../apollo/fetchs'

/* Основные атрибуты */
import styles from './MainShopPage.module.scss'
import MainShopPageProps from './MainShopPage.props'
import Loader from '../../components/UI/Loader/Loader'

/*
 * Компонент MainShopPage - главная страница магазина
 */
const MainShopPage: FC<MainShopPageProps> = () => {
    const { loading, error, data } =
        useQuery<IGetAllGoodsTypes>(GET_ALL_GOODS_TYPES)

    if (loading) return <Loader page />
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
