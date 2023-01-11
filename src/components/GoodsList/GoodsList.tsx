import React, { FC } from 'react'
import GoodCard from '../GoodCard/GoodCard'
import styles from './GoodsList.module.scss'
import GoodsListProps from './GoodsList.props'

const GoodsList: FC<GoodsListProps> = ({ data, isFull }) => {
    return (
        <div className={styles.GoodsList}>
            {!data.length ? (
                <div className={styles.GoodsList__noData}>Товаров пока нет</div>
            ) : (
                <div className={styles.GoodsList__container}>
                    <div
                        className={styles.GoodsList__goodsContainer}
                        style={{
                            gridTemplateColumns:
                                isFull || !data.length ? '1fr' : '',
                        }}
                    >
                        {data.map((good) => (
                            <GoodCard
                                data={good}
                                isFull={isFull}
                                key={good.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GoodsList
