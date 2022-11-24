import React, {FC} from 'react'
import styles from './RatingWiever.module.scss'
import RatingWieverProps from './RatingWiever.props'

const RatingWiever: FC<RatingWieverProps> = () => {
    return (
        <div className={styles.RatingWiever}>
            <div className={styles.RatingWiever__container}>
                RatingWiever Component
            </div>
        </div>
    )
}

export default RatingWiever
