/* Хуки */
import React, { FC, useState } from 'react'

/* Описание компонента */
import styles from './CategoriesPanel.module.scss'
import CategoriesPanelProps from './CategoriesPanel.props'

/* Иконки */
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { AiOutlineUnorderedList } from 'react-icons/ai'

/* Компоненты */
import TypesList from '../TypesList/TypesList'

/* Бибилиотеки */
import classNames from 'classnames'
import { IGlobalGoodsTypes } from '../../interfaces/goodsTypes.interface'

// Заголовок панели
interface HeadProps {
    onClick?: () => void
}
const Head: FC<HeadProps> = ({ onClick }) => {
    return (
        <div
            className={styles.CategoriesPanel__title}
            onClick={onClick}
        >
            <AiOutlineUnorderedList
                className={styles.CategoriesPanel__listIcon}
            />

            <h5 className={styles.CategoriesPanel__titleName}>Категории</h5>
        </div>
    )
}

// Список глобальных типов
interface ListProps {
    globalGoodsTypes: IGlobalGoodsTypes[]
    selected: number
    inHandler?: (id: number) => void
}
const List: FC<ListProps> = ({ globalGoodsTypes, selected, inHandler }) => {
    return (
        <ul className={styles.CategoriesPanel__listContainer}>
            {globalGoodsTypes.map((type) => (
                <li
                    className={styles.CategoriesPanel__typeContainer}
                    key={type.id}
                    onMouseEnter={() => {
                        inHandler(type.id)
                    }}
                >
                    <h5
                        className={classNames(
                            styles.CategoriesPanel__typeName,
                            selected === type.id
                                ? styles.CategoriesPanel__typeName_selected
                                : ''
                        )}
                    >
                        {type.name}
                    </h5>

                    <MdOutlineKeyboardArrowRight
                        className={classNames(
                            styles.CategoriesPanel__arrowIcon,
                            selected === type.id
                                ? styles.CategoriesPanel__arrowIcon_selected
                                : ''
                        )}
                    />
                </li>
            ))}
        </ul>
    )
}

// Панель глобальных типов
const CategoriesPanel: FC<CategoriesPanelProps> = ({
    globalGoodsTypes,
    startSelect,
    lock = false,
    className,
    ...props
}) => {
    // Состояние открытости панели
    const [isOpen, setIsOpen] = useState<boolean>(lock)

    // id выбранного глобального типа
    const [selected, setSelected] = useState<number>(
        startSelect !== undefined ? globalGoodsTypes[0].id : null
    )

    // Функция переключения открытости
    const openCloseHandler = () => {
        if (lock) return

        setSelected(null)
        setIsOpen((prev) => !prev)
    }

    // Функция выбора глобального типа
    const inHandler = (id) => {
        setSelected(id)
    }

    return (
        <div
            className={classNames(styles.CategoriesPanel, className)}
            {...props}
        >
            <Head onClick={openCloseHandler} />
            {isOpen && (
                <>
                    <List
                        globalGoodsTypes={globalGoodsTypes}
                        selected={selected}
                        inHandler={inHandler}
                    />
                    {selected !== null && (
                        <TypesList
                            localGoodsTypes={
                                globalGoodsTypes.find(
                                    (el) => el.id === selected
                                ).local_type_goods
                            }
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default CategoriesPanel
