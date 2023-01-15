import React, { FC } from 'react'
import styles from './Dashboard.module.scss'
import DashboardProps from './Dashboard.props'
import BuyDynamic from '../../components/BuyDynamic/BuyDynamic'
import GlobalTypesBuyDynamic from '../../components/GlobalTypesBuyDynamic/GlobalTypesBuyDynamic'

const Dashboard: FC<DashboardProps> = () => {
    return (
        <div className={styles.Dashboard}>
            <div className={styles.Dashboard__container}>
                <div className={styles.Dashboard__BuyDynamic}>
                    <BuyDynamic />
                </div>
                <div className={styles.Dashboard__GlobalTypesBuyDynamic}>
                    <GlobalTypesBuyDynamic />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
