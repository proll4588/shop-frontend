import React, { FC } from 'react'
import styles from './DescriptionTab.module.scss'
import DescriptionTabProps from './DescriptionTab.props'

const DescriptionTab: FC<DescriptionTabProps> = ({ descriprion }) => {
    return (
        <div className={styles.DescriptionTab}>
            <div className={styles.DescriptionTab__container}>
                {descriprion}
            </div>
        </div>
    )
}

export default DescriptionTab
