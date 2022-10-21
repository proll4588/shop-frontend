import React, { FC, useEffect, useState } from 'react'
import Checkbox from '../UI/Checkbox/Checkbox'
import styles from './CheckboxList.module.scss'
import CheckboxListProps from './CheckboxList.props'

const CheckboxList: FC<CheckboxListProps> = ({ data, onChange }) => {
    const [states, setStates] = useState(
        data.map((el) => ({ id: el.id, state: false }))
    )

    useEffect(() => {
        onChange && onChange(states)
    }, [states])

    return (
        <div className={styles.CheckboxList}>
            <div className={styles.CheckboxList__container}>
                {data.map((el) => (
                    <Checkbox
                        lable={el.name}
                        key={el.id}
                        state={states.find((e) => e.id === el.id).state}
                        onChange={(state) => {
                            setStates((prev) => {
                                let newState = prev.map((pr) => {
                                    if (pr.id === el.id) {
                                        return { id: pr.id, state: !pr.state }
                                    }
                                    return pr
                                })

                                return newState
                            })
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default CheckboxList
