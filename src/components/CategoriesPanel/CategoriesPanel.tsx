import React, { FC, useState } from 'react'
import styles from './CategoriesPanel.module.scss'
import CategoriesPanelProps from './CategoriesPanel.props'

import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { AiOutlineUnorderedList } from 'react-icons/ai'

import TypesList from '../TypesList/TypesList'

import classNames from 'classnames'

const CategoriesPanel: FC<CategoriesPanelProps> = ({
    globalGoodsTypes,
    startSelect,
    lock = false,
    className,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(lock)
    const [selected, setSelected] = useState<number>(
        startSelect !== undefined ? globalGoodsTypes[0].id : null
    )

    const openCloseHandler = () => {
        if (lock) {
            return
        }
        setSelected(null)
        setIsOpen((prev) => !prev)
    }

    const inHandler = (id) => {
        setSelected(id)
    }

    return (
        <div
            className={classNames(styles.CategoriesPanel, className)}
            {...props}
        >
            <div className={styles.CategoriesPanel__container}>
                <div
                    className={styles.CategoriesPanel__title}
                    onClick={openCloseHandler}
                >
                    <AiOutlineUnorderedList
                        className={styles.CategoriesPanel__listIcon}
                    />

                    <div className={styles.CategoriesPanel__titleName}>
                        Категории
                    </div>
                </div>

                {isOpen && (
                    <ul className={styles.CategoriesPanel__listContainer}>
                        {globalGoodsTypes.map((type) => (
                            <li
                                className={
                                    styles.CategoriesPanel__typeContainer
                                }
                                key={type.id}
                                onMouseEnter={() => {
                                    inHandler(type.id)
                                }}
                            >
                                <div
                                    className={`${
                                        styles.CategoriesPanel__typeName
                                    } ${
                                        selected === type.id
                                            ? styles.CategoriesPanel__typeName_selected
                                            : ''
                                    }`}
                                >
                                    {type.name}
                                </div>

                                <MdOutlineKeyboardArrowRight
                                    className={
                                        styles.CategoriesPanel__arrowIcon
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selected !== null ? (
                <TypesList
                    localGoodsTypes={
                        globalGoodsTypes.find((el) => el.id === selected)
                            .local_type_goods
                    }
                />
            ) : (
                ''
            )}
        </div>
    )
}

export default CategoriesPanel
