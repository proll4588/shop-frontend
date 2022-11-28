import React, { FC } from 'react'
import FavoriteList from '../../components/FavoriteList/FavoriteList'
import Loader from '../../components/UI/Loader/Loader'
import useFavorite from '../../hooks/favorite.hook'
import styles from './FavoritePage.module.scss'
import FavoritePageProps from './FavoritePage.props'

const FavoritePage: FC<FavoritePageProps> = () => {
    const { favoriteList, isGetLoading, error } = useFavorite()

    if (isGetLoading) return <Loader page />
    if (error) return <>{JSON.stringify(error)}</>

    return (
        <div className={styles.FavoritePage}>
            <div className={styles.FavoritePage__container}>
                <FavoriteList goods={favoriteList} />
            </div>
        </div>
    )
}

export default FavoritePage
