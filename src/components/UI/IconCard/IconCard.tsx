import React, { FC, useLayoutEffect, useState } from 'react'
import styles from './IconCard.module.scss'
import IconCardProps from './IconCard.props'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'

const IconCard: FC<IconCardProps> = ({ icon, number, title, text, to }) => {
    const [num, setNum] = useState<string>('' + number)

    useLayoutEffect(() => {
        if (number >= 1000) {
            setNum(`${Math.ceil(number / 1000)}k`)
        }
    }, [number])

    return (
        <IconContext.Provider value={{ className: styles.IconCard__icon }}>
            <div className={styles.IconCard}>
                <div className={styles.IconCard__container}>
                    {number && number !== 0 ? (
                        <div className={styles.IconCard__dotContainer}>
                            {num}
                        </div>
                    ) : (
                        ''
                    )}

                    <Link
                        to={to}
                        className={styles.IconCard__iconContainer}
                    >
                        {icon}
                    </Link>

                    {!!title && (
                        <div className={styles.IconCard__desc}>
                            <div className={styles.IconCard__title}>
                                {title}
                            </div>

                            <div className={styles.IconCard__text}>{text}</div>
                        </div>
                    )}
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default IconCard
