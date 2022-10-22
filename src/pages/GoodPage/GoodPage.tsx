import React, { FC } from 'react'
import styles from './GoodPage.module.scss'
import GoodPageProps from './GoodPage.props'

const GoodDescription = () => {
    return (
        <div className={styles.GoodDescription}>
            <div className={styles.GoodDescription__container}>description</div>
        </div>
    )
}

const GoodPhoto = () => {
    return (
        <div className={styles.GoodPhoto}>
            <div className={styles.GoodPhoto__container}>photo</div>
        </div>
    )
}

const FullGoodInfo: FC = () => {
    return (
        <div className={styles.FullGoodInfo}>
            <div className={styles.FullGoodInfo__container}>
                <GoodPhoto />
                <GoodDescription />
            </div>
        </div>
    )
}

const GoodPage: FC<GoodPageProps> = () => {
    return (
        <div className={styles.GoodPage}>
            <div className={styles.GoodPage__container}>
                <FullGoodInfo />
            </div>
        </div>
    )
}

export default GoodPage
