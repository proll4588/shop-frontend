import React, { FC } from 'react'
import GoodsTypeCard from '../GoodsTypeCard/GoodsTypeCard'
import styles from './GoodsTypeList.module.scss'
import GoodsTypeListProps from './GoodsTypeList.props'

const GoodsTypeList: FC<GoodsTypeListProps> = ({ data }) => {
    return (
        <div className={styles.GoodsTypeList}>
            <div className={styles.GoodsTypeList__container}>
                {data.map((card) => {
                    return (
                        <GoodsTypeCard
                            key={card.id}
                            name={card.name}
                            photo={card.photo}
                            href={card.href}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GoodsTypeList
