import React, { FC, useState } from 'react'
import Dropdown from '../../UI/Dropdown/Dropdown'
import styles from './InputGoodsParams.module.scss'
import InputGoodsParamsProps from './InputGoodsParams.props'

const InputGoodsParams: FC<InputGoodsParamsProps> = ({ type, params }) => {
    const [selected, setSelected] = useState<number>(null)

    return (
        <div className={styles.InputGoodsParams}>
            <div className={styles.InputGoodsParams__container}>
                {type === 'choise' ? (
                    // <Dropdown
                    //     content={[
                    //         { id: 1, name: 'name 1' },
                    //         { id: 2, name: 'name 2' },
                    //         { id: 3, name: 'name 3' },
                    //     ]}
                    // />
                    ''
                ) : type === 'price' ? (
                    <>price</>
                ) : type === 'text' ? (
                    <>text</>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default InputGoodsParams
