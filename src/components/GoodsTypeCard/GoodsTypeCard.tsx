import React, { FC } from 'react'
import styles from './GoodsTypeCard.module.scss'
import GoodsTypeCardProps from './GoodsTypeCard.props'
import { Link } from 'react-router-dom'

const GoodsTypeCard: FC<GoodsTypeCardProps> = ({ photo, name, href }) => {
    return (
        <Link to={href}>
            <div className={styles.GoodsTypeCard}>
                <div className={styles.GoodsTypeCard__container}>
                    <div className={styles.GoodsTypeCard__imgContainer}>
                        <img
                            src={
                                photo ||
                                'https://brilliant24.ru/files/cat/bg_template_01.png'
                            }
                            alt={name}
                            className={styles.GoodsTypeCard__img}
                        />
                    </div>
                    <div className={styles.GoodsTypeCard__name}>{name}</div>
                </div>
            </div>
        </Link>
    )
}

export default GoodsTypeCard
