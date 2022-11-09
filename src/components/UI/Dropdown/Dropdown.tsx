import React, { FC, useEffect, useState } from 'react'
import styles from './Dropdown.module.scss'
import DropdownProps from './Dropdown.props'
import { IoIosArrowDown } from 'react-icons/io'
import classNames from 'classnames'

interface DropdownInputProps {
    placeholder?: string
    value?: string

    isSelecting?: boolean
    isError?: boolean

    onClick?: () => void
}
const DropdownInput: FC<DropdownInputProps> = ({
    placeholder = '',
    value = '',
    onClick,
    isError,
    isSelecting,
}) => {
    const addClassName = classNames(
        styles.Dropdown__input,
        isError
            ? styles.Dropdown__input_error
            : isSelecting
            ? styles.Dropdown__input_selecting
            : ''
    )

    const clickHandler = () => {
        onClick && onClick()
    }

    return (
        <div
            className={styles.Dropdown__inputContainer}
            onClick={clickHandler}
        >
            <input
                type='text'
                value={value ? value : ''}
                placeholder={placeholder}
                className={addClassName}
                disabled
            />

            <IoIosArrowDown className={styles.Dropdown__arrowIcon} />
        </div>
    )
}

interface DropdownListProps {
    data: string[]
    selected?: string
    onSelecte?: (name: string) => void
}
const DropdownList: FC<DropdownListProps> = ({ data, onSelecte, selected }) => {
    return (
        <div className={styles.Dropdown__content}>
            <ul className={styles.Dropdown__contentList}>
                {data.map((el) => (
                    <DropdownListElement
                        data={el}
                        key={el}
                        onSelect={() => {
                            onSelecte(el)
                        }}
                        isSelected={selected === el}
                    />
                ))}
            </ul>
        </div>
    )
}

interface DropdownListElementProps {
    data: string
    isSelected?: boolean
    onSelect?: () => void
}
const DropdownListElement: FC<DropdownListElementProps> = ({
    data,
    onSelect,
    isSelected,
}) => {
    const addClassName = classNames(
        styles.Dropdown__contentElement,
        isSelected ? styles.Dropdown__contentElement_selected : ''
    )

    const clickHandler = () => {
        onSelect()
    }

    return (
        <li
            className={addClassName}
            onClick={clickHandler}
        >
            {data}
        </li>
    )
}

const Dropdown: FC<DropdownProps> = ({
    content,
    onChange,
    defaultVal,
    isError,
    placeholder,
    className,
}) => {
    const [selected, setSelected] = useState<string>(
        defaultVal !== undefined ? content[defaultVal] : ''
    )
    const [isSelecting, setIsSelecting] = useState<boolean>(false)

    const selectElement = (el) => {
        setSelected(el)
        changeSelectingStatus()
    }

    const changeSelectingStatus = () => {
        setIsSelecting((prev) => !prev)
    }

    useEffect(() => {
        if (onChange) {
            !!selected.length && onChange(selected)
        }
    }, [selected])

    return (
        <div
            className={classNames(styles.Dropdown, className ? className : '')}
        >
            <div className={styles.Dropdown__container}>
                <DropdownInput
                    isError={isError}
                    isSelecting={isSelecting}
                    onClick={changeSelectingStatus}
                    value={selected}
                    placeholder={placeholder}
                />

                {isSelecting && (
                    <DropdownList
                        data={content}
                        onSelecte={selectElement}
                        selected={selected}
                    />
                )}
            </div>
        </div>
    )
}

export default Dropdown
