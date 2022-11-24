import React, {FC} from 'react'
import styles from './RatingCreater.module.scss'
import RatingCreaterProps from './RatingCreater.props'

const RatingCreater: FC<RatingCreaterProps> = () => {
    return (
        <div className={styles.RatingCreater}>
            <div className={styles.RatingCreater__container}>
                RatingCreater Component
            </div>
        </div>
    )
}

export default RatingCreater
