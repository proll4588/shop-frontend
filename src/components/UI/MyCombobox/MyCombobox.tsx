import React, { FC, Fragment, useEffect, useState } from 'react'
import styles from './MyCombobox.module.scss'
import MyComboboxProps from './MyCombobox.props'
import { Combobox, Transition } from '@headlessui/react'
import { AiFillCaretDown } from 'react-icons/ai'
import classNames from 'classnames'

const MyCombobox: FC<MyComboboxProps> = ({
    elements,
    onQuering,
    onSelect,
    defaultValue,
    loading = false,
}) => {
    const list = [{ id: -1, name: 'nothing' }, ...elements]

    const [selected, setSelected] = useState(
        defaultValue ? defaultValue : list[0]
    )
    const [query, setQuery] = useState('')

    useEffect(() => {
        onSelect && onSelect(selected.id)
    }, [selected])

    useEffect(() => {
        onQuering && onQuering(query)
    }, [query])

    const inputChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className={styles.MyCombobox}>
            <div className={styles.MyCombobox__container}>
                <Combobox
                    value={selected}
                    onChange={setSelected}
                >
                    <div className={styles.MyCombobox__container}>
                        <div className={styles.MyCombobox__inputContainer}>
                            <Combobox.Input
                                // @ts-ignore
                                displayValue={(person) => person.name}
                                onChange={inputChangeHandler}
                                className={styles.MyCombobox__input}
                            />
                            <Combobox.Button
                                className={styles.MyCombobox__button}
                            >
                                <AiFillCaretDown />
                            </Combobox.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options
                                className={styles.MyCombobox__list}
                            >
                                {!loading &&
                                    elements.map((el) => (
                                        <Combobox.Option
                                            key={el.id}
                                            value={el}
                                            className={({ active }) =>
                                                classNames(
                                                    styles.MyCombobox__element,
                                                    active
                                                        ? styles.MyCombobox__element_active
                                                        : ''
                                                )
                                            }
                                        >
                                            {el.name}
                                        </Combobox.Option>
                                    ))}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        </div>
    )
}

export default MyCombobox
