import React, { FC } from 'react'
import GoodCard from '../GoodCard/GoodCard'
import styles from './FavoriteList.module.scss'
import FavoriteListProps from './FavoriteList.props'

const FavoriteList: FC<FavoriteListProps> = ({ goods }) => {
    return (
        <div className={styles.FavoriteList}>
            <div className={styles.FavoriteList__container}>
                {goods.length
                    ? goods.map((good) => (
                          <GoodCard
                              data={good}
                              isFull={true}
                              key={good.id}
                          />
                      ))
                    : 'Товаров пока нет'}
            </div>
        </div>
    )
}

export default FavoriteList
