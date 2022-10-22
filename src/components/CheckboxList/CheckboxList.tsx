/* Хуки */
import React, { FC, useEffect, useState } from 'react'

/* Компоненты */
import Checkbox from '../UI/Checkbox/Checkbox'

/* Описание компонента */
import styles from './CheckboxList.module.scss'
import CheckboxListProps from './CheckboxList.props'

const CheckboxList: FC<CheckboxListProps> = ({ data, onChange }) => {
    // Состояние списка
    const [states, setStates] = useState(
        data.map((el) => ({ id: el.id, state: false }))
    )

    // При изменении состояния списка вызываем функцию onChange
    useEffect(() => {
        onChange && onChange(states)
    }, [states])

    return (
        <div className={styles.CheckboxList}>
            <div className={styles.CheckboxList__container}>
                {data.map((el) => {
                    const changeHandler = (state) => {
                        setStates((prev) =>
                            prev.map((pr) => {
                                if (pr.id === el.id) {
                                    return { id: pr.id, state: state }
                                }
                                return pr
                            })
                        )
                    }

                    return (
                        <Checkbox
                            lable={el.name}
                            key={el.id}
                            state={states.find((e) => e.id === el.id).state}
                            onChange={changeHandler}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CheckboxList
