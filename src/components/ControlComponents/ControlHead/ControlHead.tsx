import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import styles from './ControlHead.module.scss'
import ControlHeadProps from './ControlHead.props'

const ControlHead: FC<ControlHeadProps> = () => {
    return (
        <div className={styles.ControlHead}>
            <div className={styles.ControlHead__container}>
                <Link to={'/goodsRedactor'}>
                    <Button large>Редактирование товаров</Button>
                </Link>
            </div>
        </div>
    )
}

export default ControlHead
