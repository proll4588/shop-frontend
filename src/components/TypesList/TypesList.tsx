import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './TypesList.module.scss'
import TypesListProps from './TypesList.props'

const TypesList: FC<TypesListProps> = ({ localGoodsTypes }) => {
    return (
        <div className={styles.TypesList}>
            <div className={styles.TypesList__container}>
                {localGoodsTypes.map((local) => {
                    return (
                        <div
                            className={styles.TypesList__localType}
                            key={local.id}
                        >
                            <div className={styles.TypesList__localTypeName}>
                                {local.name}
                            </div>
                            <ul className={styles.TypesList__subTypes}>
                                {local.sub_type_goods.map((sub) => {
                                    return (
                                        <li key={sub.id}>
                                            <Link
                                                to={`/goods/${sub.id}`}
                                                className={
                                                    styles.TypesList__subTypesLink
                                                }
                                            >
                                                {sub.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TypesList
