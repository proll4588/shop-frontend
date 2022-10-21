import React, {FC} from 'react'
import styles from './RadioButton.module.scss'
import RadioButtonProps from './RadioButton.props'

const RadioButton: FC<RadioButtonProps> = () => {
    return (
        <div className={styles.RadioButton}>
            <div className={styles.RadioButton__container}>
                RadioButton Component
            </div>
        </div>
    )
}

export default RadioButton
