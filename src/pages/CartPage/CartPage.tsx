import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import {
    GET_DATA_FOR_GOODS_PAGE,
    IGetDataForGoodsPage,
} from '../../apollo/fetchs'
import { TiDeleteOutline } from 'react-icons/ti'
import { IGood } from '../../interfaces/good.interface'
import styles from './CartPage.module.scss'
import CartPageProps from './CartPage.props'

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
    }, [num])

    const add = () => {
        setNum((prev) => prev + 1)
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
                                src={good.main_photo.photo}
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
                    <div className={styles.TableLine__inputContainer}>
                        <button
                            className={classNames(
                                styles.TableLine__btn,
                                styles.TableLine__btnsub
                            )}
                            onClick={sub}
                        >
                            -
                        </button>
                        <input
                            type='number'
                            name='col'
                            id='1'
                            className={styles.TableLine__input}
                            value={num}
                            disabled
                        />
                        <button
                            className={classNames(
                                styles.TableLine__btn,
                                styles.TableLine__btnadd
                            )}
                            onClick={add}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div
                    className={classNames(
                        styles.TableLine__colomn,
                        styles.TableLine__colomn_three
                    )}
                >
                    {/* TODO: Тут можно писать формулы вычесления цены */}
                    <h4 className={styles.TableLine__cost}>
                        {good.current_price.price * num}р
                    </h4>
                    <TiDeleteOutline
                        className={styles.TableLine__delete}
                        onClick={onDel}
                    />
                </div>
            </div>
        </div>
    )
}

interface GoodsTableProps {
    goods: IGood[]
}
const GoodsTable: FC<GoodsTableProps> = ({ goods }) => {
    return (
        <div className={styles.GoodsTable}>
            <div className={styles.GoodsTable__container}>
                <div className={styles.GoodsTable__head}>
                    <h5 className={styles.GoodsTable__headItem}>Item</h5>
                    <h5 className={styles.GoodsTable__headItem}>Qty</h5>
                    <h5 className={styles.GoodsTable__headItem}>Subtotal</h5>
                </div>

                <div className={styles.GoodsTable__body}>
                    {goods.map((good) => (
                        <TableLine
                            good={good}
                            key={good.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface SammeryProps {}
const Sammery: FC<SammeryProps> = ({}) => {
    return (
        <div className={styles.Sammery}>
            <div className={styles.Sammery__container}>Sammery Component</div>
        </div>
    )
}

const CartPage: FC<CartPageProps> = () => {
    const { loading, error, data } = useQuery<IGetDataForGoodsPage>(
        GET_DATA_FOR_GOODS_PAGE,
        {
            variables: {
                subId: 4,
            },
        }
    )

    if (error) return <p>Error :(</p>
    if (loading) return <p>loading :(</p>

    return (
        <div className={styles.CartPage}>
            <div className={styles.CartPage__container}>
                <GoodsTable goods={data.filteredGoods} />
                {/* <Sammery /> */}
            </div>
        </div>
    )
}

export default CartPage
