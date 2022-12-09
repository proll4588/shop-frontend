import React, { FC } from 'react'
import Button from '../UI/Button/Button'
import Stars from '../UI/Stars/Stars'
import styles from './RatingStatistics.module.scss'
import RatingStatisticsProps from './RatingStatistics.props'

const RatingStatistics: FC<RatingStatisticsProps> = ({ ratings }) => {
    let aver = 0
    let sum = 0
    let count = [0, 0, 0, 0, 0]

    ratings.forEach((rat) => {
        count[rat.rating - 1] = count[rat.rating - 1] + 1

        sum += rat.rating
    })

    aver = sum / ratings.length
    if (!ratings.length) aver = 0

    return (
        <div className={styles.RatingStatistics}>
            <div className={styles.RatingStatistics__container}>
                <div className={styles.RatingStatistics__left}>
                    <div className={styles.RatingStatistics__averageRating}>
                        {aver}
                    </div>
                    <Stars num={Math.floor(aver)} />
                    <div className={styles.RatingStatistics__numRev}>
                        {ratings.length} отзывов
                    </div>
                </div>
                <div className={styles.RatingStatistics__right}>
                    <div className={styles.RatingStatistics__startContainer}>
                        <Stars num={5} />
                        <div className={styles.RatingStatistics__startText}>
                            {count[4]}
                        </div>
                    </div>

                    <div className={styles.RatingStatistics__startContainer}>
                        <Stars num={4} />
                        <div className={styles.RatingStatistics__startText}>
                            {count[3]}
                        </div>
                    </div>

                    <div className={styles.RatingStatistics__startContainer}>
                        <Stars num={3} />
                        <div className={styles.RatingStatistics__startText}>
                            {count[2]}
                        </div>
                    </div>

                    <div className={styles.RatingStatistics__startContainer}>
                        <Stars num={2} />
                        <div className={styles.RatingStatistics__startText}>
                            {count[1]}
                        </div>
                    </div>

                    <div className={styles.RatingStatistics__startContainer}>
                        <Stars num={1} />
                        <div className={styles.RatingStatistics__startText}>
                            {count[0]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingStatistics
