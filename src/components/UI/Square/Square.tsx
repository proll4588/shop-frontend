import classNames from 'classnames'
import React, { FC } from 'react'
import { IconContext } from 'react-icons'
import styles from './Square.module.scss'
import SquareProps from './Square.props'

const Square: FC<SquareProps> = ({
    string,
    icon,
    active,
    disasble = false,
    error = false,
    className,
    onClick,
}) => {
    const addClassName = classNames(
        className ? className : '',
        styles.Square,
        active ? styles.Square_active : '',
        disasble ? styles.Square_disasble : '',
        error ? styles.Square_error : ''
    )

    const clickHandler = () => {
        onClick && onClick()
    }

    return (
        <div
            className={addClassName}
            onClick={disasble ? () => {} : clickHandler}
        >
            <IconContext.Provider value={{ className: styles.Square__icon }}>
                {string !== undefined
                    ? string
                    : icon !== undefined
                    ? icon
                    : 'none'}
            </IconContext.Provider>
        </div>
    )
}

export default Square
