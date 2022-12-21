import classNames from 'classnames'
import React, { FC } from 'react'
import { IconContext } from 'react-icons'
import styles from './Button.module.scss'
import ButtonProps from './Button.props'

const Button: FC<ButtonProps> = ({
    children,
    disable = false,
    large = false,
    secondary = false,
    className,
    ...props
}) => {
    const addClassName = classNames(
        className,
        styles.Button,
        secondary
            ? disable
                ? styles.Button_secondary_disable
                : styles.Button_secondary
            : disable
            ? styles.Button_primary_disable
            : styles.Button_primary,
        large ? styles.Button_large : styles.Button_medium
    )

    return (
        <IconContext.Provider value={{ className: styles.Button__icon }}>
            <button
                {...props}
                className={addClassName}
                onClick={disable ? () => {} : props.onClick}
                type={'button'}
            >
                {children}
            </button>
        </IconContext.Provider>
    )
}

export default Button
