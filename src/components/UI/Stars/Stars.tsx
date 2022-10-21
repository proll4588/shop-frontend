import React, { FC } from 'react'
import { AiFillStar } from 'react-icons/ai'
import styles from './Stars.module.scss'
import StarsProps from './Stars.props'

const Stars: FC<StarsProps> = ({ num }) => {
    const starStates = []
    for (let i = 0; i < 5; i++) starStates.push(i < num ? 1 : 0)

    return (
        <div className={styles.Stars}>
            <div className={styles.Stars__container}>
                {starStates.map((el, index) => (
                    <AiFillStar
                        key={index}
                        className={styles.Stars__star}
                        color={el ? '#FFB000' : '#888A91'}
                    />
                ))}
            </div>
        </div>
    )
}

export default Stars
