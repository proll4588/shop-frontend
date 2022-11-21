import React, { FC } from 'react'
import CartMiniCard from '../CartMiniCard/CartMiniCard'
import styles from './CartMiniCardList.module.scss'
import CartMiniCardListProps from './CartMiniCardList.props'

const CartMiniCardList: FC<CartMiniCardListProps> = ({
    col,
    goods,
    onChangeCol,
    onDel,
}) => {
    return (
        <div className={styles.CartMiniCardList}>
            <div className={styles.CartMiniCardList__container}>
                {goods.map((good) => (
                    <CartMiniCard
                        good={good}
                        key={good.id}
                        onDel={() => {
                            onDel && onDel(good.id)
                        }}
                        onChangeCol={(col) => {
                            onChangeCol && onChangeCol(good.id, col)
                        }}
                        col={col.find((el) => el.goodId === good.id).col}
                    />
                ))}
            </div>
        </div>
    )
}

export default CartMiniCardList
