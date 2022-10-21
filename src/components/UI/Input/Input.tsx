import classNames from 'classnames'
import React, { FC } from 'react'
import { IconContext } from 'react-icons'
import styles from './Input.module.scss'
import InputProps from './Input.props'

const Input: FC<InputProps> = ({
    type,
    value,
    icon,
    onChange,
    isError,
    placeholder,
    className,
}) => {
    const addClassName = classNames(
        className ? className : '',
        styles.Input__input,
        isError ? styles.Input__input_error : '',
        icon ? styles.Input__input_wi : ''
    )

    const changeHandler = (e) => {
        let str = e.target.value
        if (type === 'number') str = str.replace(/[^0-9]/g, '')
        onChange && onChange(str)
    }

    return (
        <IconContext.Provider value={{ className: styles.Input__icon }}>
            <div className={styles.Input}>
                <input
                    className={addClassName}
                    type={type === 'password' ? 'password' : 'text'}
                    value={value}
                    onChange={changeHandler}
                    placeholder={placeholder}
                />
                {icon}
            </div>
        </IconContext.Provider>
    )
}

export default Input
