import React, { FC } from 'react'
import { AiFillStar } from 'react-icons/ai'
import Stars from '../Stars/Stars'
import styles from './Rating.module.scss'
import RatingProps from './Rating.props'

interface RatingFMProps {
    revNum: number
    rating: number
}

const RatingFull: FC<RatingFMProps> = ({ revNum, rating }) => {
    const numActiveStars = Math.round(rating)

    return (
        <div className={styles.Rating__fullContainer}>
            <div className={styles.Rating__starContainer}>
                <Stars num={numActiveStars} />
            </div>
            <div className={styles.Rating__text}>{revNum}</div>
        </div>
    )
}

const RatingMini: FC<RatingFMProps> = ({ revNum, rating }) => {
    return (
        <div className={styles.Rating__miniContainer}>
            <div className={styles.Rating__ratingContainer}>
                <AiFillStar className={styles.Rating__YellowStar} />
                <div className={styles.Rating__rating}>{rating}</div>
            </div>
            <div className={styles.Rating__text}>{revNum} отзывов</div>
        </div>
    )
}

const Rating: FC<RatingProps> = ({ type, revNum, rating }) => {
    return (
        <div className={styles.Rating}>
            {type === 'full' ? (
                <RatingFull
                    rating={rating}
                    revNum={revNum}
                />
            ) : (
                <RatingMini
                    rating={rating}
                    revNum={revNum}
                />
            )}
        </div>
    )
}

export default Rating
