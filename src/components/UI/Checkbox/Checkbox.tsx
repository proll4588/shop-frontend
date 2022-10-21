import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import styles from './Checkbox.module.scss'
import CheckboxProps from './Checkbox.props'
import { BsCheck } from 'react-icons/bs'

const Checkbox: FC<CheckboxProps> = ({ lable, onChange, state, className }) => {
    const [isChecked, setIsChecked] = useState<boolean>(state ? state : false)

    const addClassName = classNames(
        styles.Checkbox__box,
        isChecked ? styles.Checkbox__box_checked : ''
    )

    const clickHandler = () => {
        setIsChecked((prev) => !prev)
    }

    useEffect(() => {
        onChange && onChange(isChecked)
    }, [isChecked])

    return (
        <div
            className={classNames(styles.Checkbox, className ? className : '')}
            onClick={clickHandler}
        >
            <div className={styles.Checkbox__container}>
                <div className={addClassName}>
                    {isChecked && <BsCheck className={styles.Checkbox__icon} />}
                </div>
                {lable && <div className={styles.Checkbox__lable}>{lable}</div>}
            </div>
        </div>
    )
}

export default Checkbox
