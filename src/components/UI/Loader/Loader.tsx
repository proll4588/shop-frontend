import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './Loader.module.scss'
import LoaderProps from './Loader.props'

const Loader: FC<LoaderProps> = ({ className, page }) => {
    const c = [0, 1, 2, 3, 4]
    return (
        <div
            className={classNames(
                styles.Loader,
                className ? className : '',
                page ? styles.Loader__page : ''
            )}
        >
            <div className={styles.Loader__container}>
                {c.map((el) => (
                    <div
                        className={styles.Loader__elContainer}
                        key={el}
                    >
                        <div
                            className={styles.Loader__el}
                            style={{
                                animationDelay: `0.${1 * el}s`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Loader
