import React, { FC } from 'react'
import styles from './RouteTitle.module.scss'
import RouteTitleProps from './RouteTitle.props'

const RouteTitle: FC<RouteTitleProps> = ({ path, title }) => {
    return (
        <div className={styles.RouteTitle}>
            <div className={styles.RouteTitle__container}>
                <div className={styles.RouteTitle__path}> {path} </div>
                <div className={styles.RouteTitle__title}> {title} </div>
            </div>
        </div>
    )
}

export default RouteTitle
