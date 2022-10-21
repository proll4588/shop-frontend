import React, { FC, useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { FiGrid } from 'react-icons/fi'
import styles from './GoodCardTypeSwitcher.module.scss'
import GoodCardTypeSwitcherProps from './GoodCardTypeSwitcher.props'

const GoodCardTypeSwitcher: FC<GoodCardTypeSwitcherProps> = ({
    onChange,
    value,
}) => {
    const [isFull, setIsFull] = useState<boolean>(value ? value : false)

    const clickHandler = (val) => {
        setIsFull(val)
        onChange(val)
    }

    return (
        <div className={styles.GoodCardTypeSwitcher}>
            <div className={styles.GoodCardTypeSwitcher__container}>
                <div
                    className={`${styles.GoodCardTypeSwitcher__iconContainer}`}
                    onClick={() => {
                        clickHandler(true)
                    }}
                >
                    <AiOutlineBars
                        className={styles.GoodCardTypeSwitcher__icon}
                    />
                </div>

                <div
                    className={`${styles.GoodCardTypeSwitcher__iconContainer}`}
                    onClick={() => {
                        clickHandler(false)
                    }}
                >
                    <FiGrid className={styles.GoodCardTypeSwitcher__icon} />
                </div>

                <div
                    className={`${styles.GoodCardTypeSwitcher__line} ${
                        !isFull
                            ? styles.GoodCardTypeSwitcher__line_selected
                            : ''
                    }`}
                />
            </div>
        </div>
    )
}

export default GoodCardTypeSwitcher
