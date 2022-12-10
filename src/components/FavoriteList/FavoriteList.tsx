import React, { FC } from 'react'
import GoodCard from '../GoodCard/GoodCard'
import styles from './FavoriteList.module.scss'
import FavoriteListProps from './FavoriteList.props'

const FavoriteList: FC<FavoriteListProps> = ({ goods }) => {
    return (
        <div className={styles.FavoriteList}>
            <div className={styles.FavoriteList__container}>
                {goods.length ? (
                    goods.map((good) => (
                        <GoodCard
                            data={good}
                            isFull={true}
                            key={good.id}
                        />
                    ))
                ) : (
                    <div className={styles.FavoriteList__noData}>
                        У вас пока не товаров в избранном
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavoriteList
