import React, { FC } from 'react'
import styles from './LabelInput.module.scss'
import LabelInputProps from './LabelInput.props'

export const LabelInput: FC<LabelInputProps> = ({ label, children }) => {
    return (
        <label className={styles.LabelInput}>
            <div className={styles.LabelInput__label}>{label}</div>
            {children}
        </label>
    )
}

export default LabelInput
