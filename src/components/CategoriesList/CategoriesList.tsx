import React, {FC} from 'react'
import styles from './CategoriesList.module.scss'
import CategoriesListProps from './CategoriesList.props'

const CategoriesList: FC<CategoriesListProps> = () => {
    return (
        <div className={styles.CategoriesList}>
            <div className={styles.CategoriesList__container}>
                CategoriesList Component
            </div>
        </div>
    )
}

export default CategoriesList
