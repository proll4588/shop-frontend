import React, { FC } from 'react'
import styles from './NumberInput.module.scss'
import NumberInputProps from './NumberInput.props'

const NumberInput: FC<NumberInputProps> = ({ value, onAdd, onSub }) => {
    return (
        <div className={styles.NumberInput}>
            <button
                className={styles.NumberInput__btn}
                onClick={onSub && onSub}
            >
                -
            </button>
            <input
                type='number'
                name='col'
                id='1'
                className={styles.NumberInput__input}
                value={value}
                disabled
            />
            <button
                className={styles.NumberInput__btn}
                onClick={onAdd && onAdd}
            >
                +
            </button>
        </div>
    )
}

export default NumberInput
