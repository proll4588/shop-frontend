import React, { FC, useLayoutEffect, useState } from 'react'
import styles from './IconCard.module.scss'
import IconCardProps from './IconCard.props'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import Square from '../Square/Square'

const getStr = (number) => {
    if (number >= 1000) {
        return `${Math.ceil(number / 1000)}k`
    }
    return `${number}`
}

const IconCard: FC<IconCardProps> = ({
    icon,
    number,
    title,
    text,
    to,
    disabled,
}) => {
    return (
        <IconContext.Provider value={{ className: styles.IconCard__icon }}>
            <div className={styles.IconCard}>
                <div className={styles.IconCard__container}>
                    {!!number && number !== 0 && (
                        <div className={styles.IconCard__dotContainer}>
                            {getStr(number)}
                        </div>
                    )}

                    {disabled ? (
                        <Square
                            icon={icon}
                            disasble={disabled}
                        />
                    ) : (
                        <Link to={to}>
                            <Square
                                icon={icon}
                                disasble={disabled}
                            />
                        </Link>
                    )}

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
