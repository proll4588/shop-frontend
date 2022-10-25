import React, { FC } from 'react'
import styles from './ControlGoodsElement.module.scss'
import ControlGoodsElementProps from './ControlGoodsElement.props'

const ControlGoodsElement: FC<ControlGoodsElementProps> = ({ data }) => {
    const { id, name, brands, sub_type_goods, current_price } = data
    return (
        <div className={styles.ControlGoodsElement}>
            <div className={styles.ControlGoodsElement__container}>
                <div className={styles.ControlGoodsElement__id}>{id}</div>
                <div className={styles.ControlGoodsElement__name}>{name}</div>
                <div className={styles.ControlGoodsElement__brand}>
                    {brands.name}
                </div>
                <div className={styles.ControlGoodsElement__typeName}>
                    {sub_type_goods.name}
                </div>
                <div className={styles.ControlGoodsElement__price}>
                    {current_price.price}
                </div>
            </div>
        </div>
    )
}

export default ControlGoodsElement
