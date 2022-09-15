import React, {FC} from 'react'
import styles from './TemplateName.module.scss'
import TemplateNameProps from './TemplateName.props'

const TemplateName: FC<TemplateNameProps> = () => {
    return (
        <div className={styles.TemplateName}>
            <div className={styles.TemplateName__container}>
                TemplateName Component
            </div>
        </div>
    )
}

export default TemplateName
