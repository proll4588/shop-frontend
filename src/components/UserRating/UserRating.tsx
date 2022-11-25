import React, { FC } from 'react'
import Stars from '../UI/Stars/Stars'
import styles from './UserRating.module.scss'
import UserRatingProps from './UserRating.props'

const UserRating: FC<UserRatingProps> = ({ rating }) => {
    const user = rating.users
    const date = new Date(rating.date)

    let name = ''
    name += user.fname ? user.fname + ' ' : ''
    name += user.lname ? user.lname : ''

    if (!name.length) {
        name = String(user.id)
    }

    return (
        <div className={styles.UserRating}>
            <div className={styles.UserRating__container}>
                <div className={styles.UserRating__userInfo}>
                    <div className={styles.UserRating__photoContaienr}>
                        {user.photo && (
                            <img
                                src={user.photo}
                                alt={user.fname}
                                className={styles.UserRating__photo}
                            />
                        )}
                    </div>
                    <div className={styles.UserRating__right}>
                        <div className={styles.UserRating__fullName}>
                            {name}
                        </div>
                        <div className={styles.UserRating__date}>
                            {date.toDateString()}
                        </div>
                        <div className={styles.UserRating__rating}>
                            <Stars num={rating.rating} />
                        </div>
                    </div>
                </div>
                <p className={styles.UserRating__text}>{rating.text}</p>
            </div>
        </div>
    )
}

export default UserRating
