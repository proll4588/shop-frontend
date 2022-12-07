import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GET_ORDERS } from '../../apollo/fetchs'
import Button from '../../components/UI/Button/Button'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import Input from '../../components/UI/Input/Input'
import useDebounce from '../../hooks/debounce.hook'
import { IOrder, IDeliveryInfo } from '../../interfaces/order.interface'
import styles from './OrdersPage.module.scss'
import OrdersPageProps from './OrdersPage.props'

const headMenu = [
    { id: 1, name: 'Все заказы', operStatus: null },
    { id: 2, name: 'Полученные', operStatus: 'getted' },
    { id: 3, name: 'В процессе', operStatus: 'inProc' },
    { id: 4, name: 'Отменённые', operStatus: 'denied' },
    { id: 5, name: 'Доставленне', operStatus: 'deliv' },
    { id: 6, name: 'Готовые', operStatus: 'ready' },
]

const statuses = [
    { id: 1, name: 'В процессе' },
    { id: 2, name: 'Доставлено' },
    { id: 4, name: 'Отменено' },
    { id: 3, name: 'Получено' },
    { id: 5, name: 'Готов к выдаче' },
]

interface HeadProps {
    onChange?: (value) => void
    value: number
}
const Head: FC<HeadProps> = ({ onChange, value }) => {
    return (
        <div className={styles.Head}>
            <ul className={styles.Head__container}>
                {headMenu.map((el) => (
                    <li
                        key={el.id}
                        onClick={() => {
                            onChange(el.id)
                        }}
                        className={classNames(
                            styles.Head__el,
                            value === el.id ? styles.Head__active : ''
                        )}
                    >
                        {el.name}
                    </li>
                ))}
                <div
                    className={styles.Head__line}
                    style={{ left: 130 * (value - 1) }}
                />
            </ul>
        </div>
    )
}

interface FilterPanelProps {
    onChangeText?: (value) => void
    onChangeFilte?: (type) => void
}
const FilterPanel: FC<FilterPanelProps> = ({ onChangeFilte, onChangeText }) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        onChangeText && onChangeText(search)
    }, [search])

    useEffect(() => {
        if (onChangeFilte) {
            const status = headMenu.find((el) => el.name === filter)

            onChangeFilte(status ? status.operStatus : null)
        }
    }, [filter])

    return (
        <div className={styles.FilterPanel}>
            <div className={styles.FilterPanel__container}>
                <Input
                    type='text'
                    value={search}
                    onChange={setSearch}
                    icon={<AiOutlineSearch />}
                    placeholder='Search for Order ID, item'
                    className={styles.FilterPanel__input}
                />
                <Dropdown
                    content={headMenu.map((el) => el.name)}
                    placeholder={'Сортировать'}
                    onChange={setFilter}
                />
            </div>
        </div>
    )
}

interface OrderTableProps {
    orders: IOrder[]
}
const OrderTable: FC<OrderTableProps> = ({ orders }) => {
    console.log(orders)

    return (
        <div className={styles.OrderTable}>
            <div className={styles.OrderTable__container}>
                <table className={styles.OrderTable__table}>
                    <tr className={styles.OrderTable__tableHeadRaw}>
                        <th>ID заказ</th>
                        <th>Товары</th>
                        <th>Дата оформления</th>
                        <th>Цена</th>
                        <th>Статус заказа</th>
                    </tr>
                    {orders.map((order) => (
                        <OrdersTableRaw
                            order={order}
                            key={order.id}
                        />
                    ))}
                </table>
            </div>
        </div>
    )
}

interface OrdersTableRawProps {
    order: IOrder
}
const OrdersTableRaw: FC<OrdersTableRawProps> = ({ order }) => {
    const [showItems, setShowItems] = useState(false)

    const showHandler = () => {
        setShowItems((prev) => !prev)
    }

    const date = new Date(order.date)
    let sum = 0

    order.delivery_info.forEach((info) => {
        // TODO: Общую цену доставки надо хранить в инфо о даставке
        sum += info.prices.discount || info.prices.price
    })

    const strDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

    return (
        <>
            <tr className={styles.OrderTable__tableRaw}>
                <td>{order.id}</td>
                <td
                    onClick={showHandler}
                    className={styles.OrderTable__items}
                >
                    Товары
                </td>
                <td>{strDate}</td>
                <td>{sum}р</td>
                <td>
                    <OrderStatus statusId={order.operations_status_id} />
                </td>
            </tr>
            {showItems && <InfoTable info={order.delivery_info} />}
        </>
    )
}

interface InfoTableRawProps {
    info: IDeliveryInfo
}
const InfoTableRaw: FC<InfoTableRawProps> = ({ info }) => {
    const { goods_catalog: good } = info

    return (
        <tr
            className={classNames(
                styles.OrderTable__tableRaw,
                styles.OrderTable__infoTableRaw
            )}
        >
            <td>{good.id}</td>
            <td>{good.name}</td>
            <td>{info.count}</td>
            <td>{info.prices.discount || info.prices.price}р</td>
            <td></td>
        </tr>
    )
}

interface OrderStatusProps {
    statusId: number
}
const OrderStatus: FC<OrderStatusProps> = ({ statusId }) => {
    const getStr = () => {
        return statuses.find((el) => el.id === statusId).name || 'Null'
    }

    const addClass = classNames(
        styles.OrderStatus__container,
        styles[`OrderStatus__container_${statusId}`]
    )

    return (
        <div className={styles.OrderStatus}>
            <div className={addClass}>{getStr()}</div>
        </div>
    )
}

interface InfoTableProps {
    info: IDeliveryInfo[]
}
const InfoTable: FC<InfoTableProps> = ({ info }) => {
    return (
        <>
            <tr
                className={classNames(
                    styles.OrderTable__tableHeadRaw,
                    styles.OrderTable__infoTableHeadRaw
                )}
            >
                <th>ID Товара</th>
                <th>Название</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th></th>
            </tr>
            {info.map((el) => (
                <InfoTableRaw
                    info={el}
                    key={el.id}
                />
            ))}
        </>
    )
}

// TODO: при мзиенении фильтра, переключать страницу на первую
const OrdersPage: FC<OrdersPageProps> = () => {
    const viewCount = 10

    const [filter, setFulter] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const dbSearch = useDebounce(search)

    const { data, loading, error } = useQuery(GET_ORDERS, {
        variables: {
            skip: viewCount * (page - 1),
            take: viewCount,
            operStatus: filter,
            search: dbSearch,
        },
    })

    const nextPage = () => {
        setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        setPage((prev) => prev - 1)
    }

    return (
        <div className={styles.OrdersPage}>
            <div className={styles.OrdersPage__container}>
                {/* <Head
                    value={curHead}
                    onChange={setCurHead}
                /> */}
                <FilterPanel
                    onChangeFilte={setFulter}
                    onChangeText={setSearch}
                />
                {loading || error ? (
                    'loading'
                ) : (
                    <>
                        <OrderTable orders={data.getOrders.data} />
                        <div className={styles.OrdersPage__navPanel}>
                            <Button
                                disable={page === 1}
                                onClick={prevPage}
                            >
                                Назад
                            </Button>

                            <div className={styles.OrdersPage__navInfo}>
                                {viewCount * (page - 1) + 1} -{' '}
                                {viewCount * page > data.getOrders.count
                                    ? data.getOrders.count
                                    : viewCount * page}{' '}
                                из {data.getOrders.count}
                            </div>

                            <Button
                                disable={
                                    viewCount * page >= data.getOrders.count
                                }
                                onClick={nextPage}
                            >
                                Далее
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrdersPage
