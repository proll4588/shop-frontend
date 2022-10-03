import React, {FC} from 'react'
import styles from './GoodsTypeCard.module.scss'
import GoodsTypeCardProps from './GoodsTypeCard.props'

const GoodsTypeCard: FC<GoodsTypeCardProps> = () => {
    return (
        <div className={styles.GoodsTypeCard}>
            <div className={styles.GoodsTypeCard__container}>
                GoodsTypeCard Component
            </div>
        </div>
    )
}

export default GoodsTypeCard
