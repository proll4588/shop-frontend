/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { IGood } from '../../interfaces/good.interface'
import styles from './CartPage.module.scss'
import CartPageProps from './CartPage.props'
import useCart from '../../hooks/cart.hook'
import Button from '../../components/UI/Button/Button'
import Square from '../../components/UI/Square/Square'
import { MdDeleteOutline } from 'react-icons/md'
import CartMiniCardList from '../../components/CartMiniCardList/CartMiniCardList'
import NumberInput from '../../components/UI/NumberInput/NumberInput'
import { useNavigate } from 'react-router-dom'
import { GOODS_PATH } from '../../apollo/fetchs'

interface TableLineProps {
    good: IGood
    col?: number
    onChangeCol?: (col: number) => void
    onDel?: () => void
}
const TableLine: FC<TableLineProps> = ({ good, col, onChangeCol, onDel }) => {
    const [num, setNum] = useState<number>(col ? col : 1)

    useEffect(() => {
        onChangeCol && onChangeCol(num)
        // changeInCart(good.id, num)
    }, [num])

    const add = () => {
        if (good.storage.count !== num) setNum((prev) => prev + 1)
    }

    const sub = () => {
        if (num > 1) setNum((prev) => prev - 1)
    }

    return (
        <div className={styles.TableLine}>
            <div className={styles.TableLine__container}>
                <div
                    className={classNames(
                        styles.TableLine__colomn,
                        styles.TableLine__colomn_one
                    )}
                >
                    <div className={styles.TableLine__photoContainer}>
                        {good.main_photo && (
                            <img
                                src={GOODS_PATH + good.main_photo.photo}
                                alt={good.name}
                                className={styles.TableLine__photo}
                            />
                        )}
                    </div>

                    <h5 className={styles.TableLine__name}>{good.name}</h5>
                </div>

                <div
                    className={classNames(
                        styles.TableLine__colomn,
                        styles.TableLine__colomn_two
                    )}
                >
                    <NumberInput
                        value={num}
                        onAdd={add}
                        onSub={sub}
                    />
                    <div className={styles.TableLine__maxCount}>
                        Max: {good.storage.count}
                    </div>
                </div>

                <div
                    className={classNames(
                        styles.TableLine__colomn,
                        styles.TableLine__colomn_three
                    )}
                >
                    <div className={styles.TableLine__cost}>
                        <div className={styles.TableLine__costCalc}>
                            {num} * {good.current_price.price}??? =
                        </div>
                        <h4 className={styles.TableLine__fullCost}>
                            {(good.current_price.discount
                                ? good.current_price.discount
                                : good.current_price.price) * num}
                            ???
                        </h4>
                        {good.current_price.discount && (
                            <div className={styles.TableLine__unDis}>
                                {num * good.current_price.price} ???
                            </div>
                        )}
                    </div>
                    <Square
                        icon={
                            <MdDeleteOutline
                            // className={styles.TableLine__delete}
                            // onClick={onDel}
                            />
                        }
                        onClick={onDel}
                    />
                </div>
            </div>
        </div>
    )
}

interface GoodsTableProps {
    goods: IGood[]
    col: {
        goodId: number
        col: number
    }[]

    onDel?: (goodId) => void
    onChangeCol?: (goodId, col) => void
}
const GoodsTable: FC<GoodsTableProps> = ({
    goods,
    onChangeCol,
    onDel,
    col,
}) => {
    return (
        <div className={styles.GoodsTable}>
            <div className={styles.GoodsTable__container}>
                <div className={styles.GoodsTable__head}>
                    <h5 className={styles.GoodsTable__headItem}>??????????</h5>
                    <h5 className={styles.GoodsTable__headItem}>??????-????</h5>
                    <h5 className={styles.GoodsTable__headItem}>????????</h5>
                </div>

                <div className={styles.GoodsTable__body}>
                    {goods.map((good) => (
                        <TableLine
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
        </div>
    )
}

interface SammeryLineProps {
    left: string
    right: string
}
export const SammeryLine: FC<SammeryLineProps> = ({ left, right }) => {
    return (
        <div className={styles.SammeryLine}>
            <div className={styles.SammeryLine__left}>{left}</div>
            <div className={styles.SammeryLine__right}>{right}</div>
        </div>
    )
}

interface SammeryProps {
    cartInfo: {
        count: number
        goods_catalog: IGood
    }[]
}
export const Sammery: FC<SammeryProps> = ({ cartInfo }) => {
    const nav = useNavigate()

    let subTotal = 0
    let discount = 0
    let total = 0
    let fullCount = 0

    cartInfo.forEach((cart) => {
        subTotal += cart.count * cart.goods_catalog.current_price.price
        fullCount += cart.count
    })

    cartInfo.forEach((cart) => {
        if (cart.goods_catalog.current_price.discount) {
            discount +=
                cart.count *
                (cart.goods_catalog.current_price.price -
                    cart.goods_catalog.current_price.discount)
        }
    })

    total = subTotal - discount

    return (
        <div className={styles.Sammery}>
            <div className={styles.Sammery__container}>
                <h3 className={styles.Sammery__head}>????????????</h3>
                <div className={styles.Sammery__calc}>
                    <SammeryLine
                        left='?????? ?????????? ????????????'
                        right={String(subTotal) + '???'}
                    />
                    <SammeryLine
                        left='????????????'
                        right={String(discount) + '???'}
                    />
                </div>
                <SammeryLine
                    left={`???????? (${fullCount} ??????????????)`}
                    right={String(total) + '???'}
                />
                <Button
                    className={styles.Sammery__checkout}
                    onClick={() => {
                        nav('/checkout')
                    }}
                    disable={!cartInfo.length}
                >
                    ???????????????? ??????????
                </Button>
            </div>
        </div>
    )
}

const CartPage: FC<CartPageProps> = () => {
    const { cartList, isGetLoading, error, changeInCart, removeFromCart } =
        useCart()

    if (error) return <p>Error :(</p>
    if (isGetLoading) return <p>loading :(</p>

    return (
        <div className={styles.CartPage}>
            {!!cartList.length ? (
                <div className={styles.CartPage__container}>
                    <div className={styles.CartPage__goodsTableContainer}>
                        <GoodsTable
                            goods={cartList.map((el) => el.goods_catalog)}
                            col={cartList.map((el) => ({
                                goodId: el.goods_catalog.id,
                                col: el.count,
                            }))}
                            onChangeCol={(goodId, col) => {
                                changeInCart(goodId, col)
                            }}
                            onDel={(goodId) => {
                                removeFromCart(goodId)
                            }}
                        />
                    </div>

                    <div className={styles.CartPage__miniContainer}>
                        <CartMiniCardList
                            goods={cartList.map((el) => el.goods_catalog)}
                            col={cartList.map((el) => ({
                                goodId: el.goods_catalog.id,
                                col: el.count,
                            }))}
                            onChangeCol={(goodId, col) => {
                                changeInCart(goodId, col)
                            }}
                            onDel={(goodId) => {
                                removeFromCart(goodId)
                            }}
                        />
                    </div>

                    <div className={styles.CartPage__sammeryContainer}>
                        <Sammery cartInfo={cartList} />
                        <div className={styles.CartPage__containerDown} />
                    </div>
                </div>
            ) : (
                <div className={styles.CartPage__noData}>
                    ?? ?????? ???????? ?????? ?????????????? ?? ??????????????
                </div>
            )}
        </div>
    )
}

export default CartPage
