import React, {FC} from 'react'
import styles from './GoodsTypeList.module.scss'
import GoodsTypeListProps from './GoodsTypeList.props'

const GoodsTypeList: FC<GoodsTypeListProps> = () => {
    return (
        <div className={styles.GoodsTypeList}>
            <div className={styles.GoodsTypeList__container}>
                GoodsTypeList Component
            </div>
        </div>
    )
}

export default GoodsTypeList
