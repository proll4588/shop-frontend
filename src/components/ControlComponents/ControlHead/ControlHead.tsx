import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import styles from './ControlHead.module.scss'
import ControlHeadProps from './ControlHead.props'

const menu = [
    { id: 1, name: 'Редактирование товаров', route: 'goodsRedactor', w: 210 },
    { id: 2, name: 'Статистика', route: 'statistics', w: 110 },
    { id: 3, name: 'Работа с заказами', route: 'orders', w: 150 },
    // { id: 4, name: '', route: '' },
    // { id: 5, name: '', route: '' },
]

const ControlHead: FC<ControlHeadProps> = () => {
    // const location = useLocation().pathname.substring(1)

    // const getW = () => {
    //     return menu.find((el) => el.route === location).w + 10
    // }

    // const getLeft = () => {
    //     let sum = 10
    //     const selected = menu.find((el) => el.route === location).id

    //     menu.filter((el) => el.id < selected).forEach(
    //         (el) => (sum += el.w + 10)
    //     )

    //     return sum
    // }

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
                {/* <div
                    className={styles.ControlHead__selector}
                    // style={{
                    //     width: getW(),
                    //     left: getLeft(),
                    // }}
                /> */}
            </div>
        </div>
    )
}

export default ControlHead
