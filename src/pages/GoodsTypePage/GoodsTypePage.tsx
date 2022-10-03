import React, {FC} from 'react'
import styles from './GoodsTypePage.module.scss'
import GoodsTypePageProps from './GoodsTypePage.props'

const GoodsTypePage: FC<GoodsTypePageProps> = () => {
    return (
        <div className={styles.GoodsTypePage}>
            <div className={styles.GoodsTypePage__container}>
                GoodsTypePage Component
            </div>
        </div>
    )
}

export default GoodsTypePage
