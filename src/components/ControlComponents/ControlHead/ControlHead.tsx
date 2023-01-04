import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import styles from './ControlHead.module.scss'
import ControlHeadProps from './ControlHead.props'
import AppSwither from '../../AppSwither/AppSwither'

const menu = [
    { id: 1, name: 'Редактирование товаров', route: 'goodsRedactor', w: 210 },
    { id: 2, name: 'Статистика', route: 'statistics', w: 110 },
    { id: 3, name: 'Работа с заказами', route: 'orders', w: 150 },
    // { id: 4, name: '', route: '' },
    // { id: 5, name: '', route: '' },
]

const ControlHead: FC<ControlHeadProps> = () => {
    return (
        <div className={styles.ControlHead}>
            <div className={styles.ControlHead__container}>
                <ul className={styles.ControlHead__list}>
                    {menu.map((el) => (
                        <li key={el.id}>
                            <NavLink
                                to={'/' + el.route}
                                className={(isActive) => {
                                    return classNames(
                                        styles.ControlHead__element,
                                        isActive
                                            ? styles.ControlHead__element_active
                                            : ''
                                    )
                                }}
                            >
                                {el.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <AppSwither />
            </div>
        </div>
    )
}

export default ControlHead
