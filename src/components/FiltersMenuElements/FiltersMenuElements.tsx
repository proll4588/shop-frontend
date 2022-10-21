import React, { FC, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './FiltersMenuElements.module.scss'
import FiltersMenuElementsProps from './FiltersMenuElements.props'

interface CheckboxListProps {
    data: string[]
    onChange?: (data: string[]) => void
    value?: string[]
}

const CheckboxList: FC<CheckboxListProps> = ({ data, onChange, value }) => {
    const [listState, setListState] = useState<string[]>(value ? value : [])

    const changeHandler = (state, el) => {
        if (state) setListState((prev) => [...prev, el])
        else setListState((prev) => prev.filter((e) => e !== el))
    }

    useEffect(() => {
        onChange && onChange(listState)
    }, [listState])

    return (
        <ul className={styles.CheckboxList}>
            {data.map((el) => (
                // <div
                //     className={styles.CheckboxList__containerElement}
                //     key={el}
                // >
                <Checkbox
                    lable={el}
                    key={el}
                    onChange={(s) => {
                        changeHandler(s, el)
                    }}
                    state={listState.indexOf(el) !== -1}
                    className={styles.CheckboxList__checkBox}
                />
                // </div>
            ))}
        </ul>
    )
}

interface RangeMenuProps {
    data: { min: number; max: number }
    onChange?: (data: { min: number; max: number }) => void
    value?: { min: number; max: number }
}

const RangeMenu: FC<RangeMenuProps> = ({ data, onChange, value }) => {
    const [min, setMin] = useState<number>(value ? value.min : null)
    const [max, setMax] = useState<number>(value ? value.max : null)

    const minChangeHandler = (val) => {
        let a = val === '' ? null : Number(val)
        setMin(a)
    }

    const maxChangeHandler = (val) => {
        let a = val === '' ? null : Number(val)
        setMax(a)
    }

    const convert = (val) => {
        return val === null ? '' : String(val)
    }

    useEffect(() => {
        onChange({ min: min, max: max })
    }, [min, max])

    return (
        <div className={styles.RangeMenu}>
            <Input
                type='number'
                placeholder={String(data.min)}
                value={convert(min)}
                onChange={minChangeHandler}
                className={styles.RangeMenu__input}
            />
            <div className={styles.RangeMenu__text}>-</div>
            <Input
                type='number'
                placeholder={String(data.max)}
                value={convert(max)}
                onChange={maxChangeHandler}
                className={styles.RangeMenu__input}
            />
        </div>
    )
}

const FiltersMenuElements: FC<FiltersMenuElementsProps> = ({
    title,
    type,
    data,
    onChange,
    value,
}) => {
    const [isFull, setIsFull] = useState<boolean>(true)
    const [state, setState] = useState(value ? value : null)

    const clickHandler = () => {
        setIsFull((prev) => !prev)
    }

    const changeHandler = (val) => {
        setState(val)
    }

    useEffect(() => {
        onChange && onChange(state)
    }, [state])

    return (
        <div className={styles.FiltersMenuElements}>
            <div className={styles.FiltersMenuElements__container}>
                <div
                    className={styles.FiltersMenuElements__head}
                    onClick={clickHandler}
                >
                    <div className={styles.FiltersMenuElements__title}>
                        {title}
                    </div>
                    <IoIosArrowDown
                        className={styles.FiltersMenuElements__icon}
                    />
                </div>

                {isFull && (
                    <div className={styles.FiltersMenuElements__main}>
                        {'min' in data ? (
                            <RangeMenu
                                data={data}
                                onChange={changeHandler}
                                // @ts-ignore
                                value={state}
                            />
                        ) : (
                            <CheckboxList
                                data={data}
                                onChange={changeHandler}
                                // @ts-ignore
                                value={state}
                            />
                        )}
                    </div>
                )}

                <div className={styles.FiltersMenuElements__line} />
            </div>
        </div>
    )
}

export default FiltersMenuElements
