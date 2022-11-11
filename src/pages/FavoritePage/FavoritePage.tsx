import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { GET_FAVORITE } from '../../apollo/fetchs'
import GoodsList from '../../components/GoodsList/GoodsList'
import useFavorite from '../../hooks/favorite.hook'
import styles from './FavoritePage.module.scss'
import FavoritePageProps from './FavoritePage.props'

const FavoritePage: FC<FavoritePageProps> = () => {
    const { data, loading, error } = useFavorite()

    if (loading) return <>Loading</>
    if (error) return <>{JSON.stringify(error)}</>
    const { getFavorite } = data

    return (
        <div className={styles.FavoritePage}>
            <div className={styles.FavoritePage__container}>
                <GoodsList data={getFavorite} />
            </div>
        </div>
    )
}

export default FavoritePage
