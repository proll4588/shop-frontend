import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import NumberInput from '../UI/NumberInput/NumberInput'
import styles from './CartMiniCard.module.scss'
import CartMiniCardProps from './CartMiniCard.props'

const CartMiniCard: FC<CartMiniCardProps> = ({
    good,
    col,
    onChangeCol,
    onDel,
}) => {
    const [num, setNum] = useState<number>(col ? col : 1)

    useEffect(() => {
        onChangeCol && onChangeCol(num)
    }, [num])

    const add = () => {
        setNum((prev) => prev + 1)
    }

    const sub = () => {
        if (num > 1) setNum((prev) => prev - 1)
    }

    return (
        <div className={styles.CartMiniCard}>
            <div className={styles.CartMiniCard__container}>
                <div className={styles.CartMiniCard__left}>
                    {good.main_photo && (
                        <img
                            alt={good.name}
                            src={good.main_photo.photo}
                            className={styles.CartMiniCard__photo}
                        />
                    )}
                </div>
                <div className={styles.CartMiniCard__right}>
                    <div className={styles.CartMiniCard__l1}>
                        <div className={styles.CartMiniCard__name}>
                            {good.name}
                        </div>
                        <AiOutlineClose
                            className={styles.CartMiniCard__icon}
                            onClick={onDel}
                        />
                    </div>
                    <div className={styles.CartMiniCard__l2}>
                        {good.current_price.price * num}р
                    </div>
                    <div className={styles.CartMiniCard__l3}>
                        <NumberInput
                            value={num}
                            onAdd={add}
                            onSub={sub}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartMiniCard
