import React, { FC } from 'react'
import UserRating from '../UserRating/UserRating'
import styles from './RatingWiever.module.scss'
import RatingWieverProps from './RatingWiever.props'

const RatingWiever: FC<RatingWieverProps> = ({ ratings }) => {
    let withText = ratings.filter((rate) => rate.text !== null)

    return (
        <div className={styles.RatingWiever}>
            <div className={styles.RatingWiever__container}>
                {withText.length ? (
                    withText.map((rating) => (
                        <UserRating
                            rating={rating}
                            key={rating.id}
                        />
                    ))
                ) : (
                    <h3 className={styles.RatingWiever__no}>
                        У товара пока нет отзывов
                    </h3>
                )}
            </div>
        </div>
    )
}

export default RatingWiever
