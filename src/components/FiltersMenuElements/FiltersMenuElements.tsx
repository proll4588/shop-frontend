import React, { FC, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import {
    IFilterListData,
    IFilterRangeData,
} from '../../interfaces/IResponseFilters.interface'

import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './FiltersMenuElements.module.scss'
import FiltersMenuElementsProps from './FiltersMenuElements.props'

interface CheckboxListProps {
    data: IFilterListData
    onChange?: (ids: number[]) => void
    value?: number[]
}
const CheckboxList: FC<CheckboxListProps> = ({ data, onChange, value }) => {
    const [listState, setListState] = useState<number[]>(value ? value : [])

    const changeHandler = (state, id) => {
        if (state) setListState((prev) => [...prev, id])
        else setListState((prev) => prev.filter((e) => e !== id))
    }

    useEffect(() => {
        onChange && onChange(listState)
    }, [listState])

    return (
        <ul className={styles.CheckboxList}>
            {data.values.map((el) => (
                <Checkbox
                    lable={el.value}
                    key={el.id}
                    onChange={(state) => {
                        changeHandler(state, el.id)
                    }}
                    state={listState.indexOf(el.id) !== -1}
                    className={styles.CheckboxList__checkBox}
                />
            ))}
        </ul>
    )
}

interface RangeMenuProps {
    data: IFilterRangeData
    onChange?: (data: { min: number; max: number }) => void
    value?: { min: number; max: number }
}
const RangeMenu: FC<RangeMenuProps> = ({ data, onChange, value }) => {
    const [min, setMin] = useState<number>(value ? value.min : null)
    const [max, setMax] = useState<number>(value ? value.max : null)

    const minChangeHandler = (val) => {
        if (val.length > 8) return
        let a = val === '' ? null : Number(val)
        setMin(a)
    }

    const maxChangeHandler = (val) => {
        if (val.length > 8) return
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
                placeholder={'От ' + String(data.min) + 'р'}
                value={convert(min)}
                onChange={minChangeHandler}
                className={styles.RangeMenu__input}
            />
            {/* <div className={styles.RangeMenu__text}>-</div> */}
            <Input
                type='number'
                placeholder={'До ' + String(data.max) + 'р'}
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
    isOpen = true,
}) => {
    const [isFull, setIsFull] = useState<boolean>(isOpen)
    const [state, setState] = useState<number[] | { min: number; max: number }>(
        value ? value : null
    )

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
                    <h4 className={styles.FiltersMenuElements__title}>
                        {title}
                    </h4>
                    <IoIosArrowDown
                        className={styles.FiltersMenuElements__icon}
                    />
                </div>

                {isFull && (
                    <div className={styles.FiltersMenuElements__main}>
                        {type === 'list' ? (
                            <CheckboxList
                                data={'values' in data && data}
                                onChange={changeHandler}
                                // @ts-ignore
                                value={state}
                            />
                        ) : (
                            <RangeMenu
                                data={'max' in data && data}
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
