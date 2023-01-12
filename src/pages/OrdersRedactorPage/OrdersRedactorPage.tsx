import React, { FC, useEffect, useState } from 'react'
import styles from './OrdersRedactorPage.module.scss'
import OrdersRedactorPageProps from './OrdersRedactorPage.props'
import { IOrder } from '../../interfaces/order.interface'
import useDebounce from '../../hooks/debounce.hook'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ADMIN_ORDERS, UPDATE_ORDER_STATUS } from '../../apollo/fetchs'
import { FilterPanel, InfoTable, OrderStatus } from '../OrdersPage'
import MyMenu from '../../components/MyMenu/MyMenu'
import { TiDeleteOutline } from 'react-icons/ti'
import Loader from '../../components/UI/Loader/Loader'
import { AiOutlineCheck } from 'react-icons/ai'
import Button from '../../components/UI/Button/Button'

interface OrderTableProps {
    orders?: IOrder[]
    loading?: boolean
}
const OrderTable: FC<OrderTableProps> = ({ orders, loading }) => {
    return (
        <div className={styles.OrderTable}>
            <div className={styles.OrderTable__container}>
                <table className={styles.OrderTable__table}>
                    <tr className={styles.OrderTable__tableHeadRaw}>
                        <th>ID заказ</th>
                        <th>Номер пользователя</th>
                        <th>Товары</th>
                        <th>Дата оформления</th>
                        <th>Цена</th>
                        <th>Способ получения</th>
                        <th>Оплата</th>
                        <th>Статус заказа</th>
                    </tr>
                    {orders &&
                        orders.map((order) => (
                            <OrdersTableRaw
                                order={order}
                                key={order.id}
                            />
                        ))}
                </table>
                {loading && <Loader className={styles.OrderTable__loader} />}
                {!!orders && orders.length === 0 && (
                    <div className={styles.OrderTable__noData}>
                        Тут будут отображаться ваши заказы
                    </div>
                )}
            </div>
        </div>
    )
}

interface OrdersTableRawProps {
    order: IOrder
}
const OrdersTableRaw: FC<OrdersTableRawProps> = ({ order }) => {
    const [showItems, setShowItems] = useState(false)

    const [update, updateData] = useMutation(UPDATE_ORDER_STATUS, {
        refetchQueries: [{ query: GET_ADMIN_ORDERS }],
    })

    const getted = () => {
        update({
            variables: {
                orderId: order.id,
                status: 'getted',
            },
        })
    }

    const ready = () => {
        update({
            variables: {
                orderId: order.id,
                status: 'ready',
            },
        })
    }

    const deliv = () => {
        update({
            variables: {
                orderId: order.id,
                status: 'deliv',
            },
        })
    }

    const cancel = () => {
        update({
            variables: {
                orderId: order.id,
                status: 'denied',
            },
        })
    }

    const showHandler = () => {
        setShowItems((prev) => !prev)
    }

    const date = new Date(order.date)
    let sum = 0

    order.delivery_info.forEach((info) => {
        // TODO: Общую цену доставки надо хранить в инфо о даставке
        sum += info.prices.discount || info.prices.price
    })

    const strDate = `${date.getDate()}.${
        date.getMonth() + 1
    }.${date.getFullYear()}`

    const items = [
        {
            id: 1,
            icon: <TiDeleteOutline />,
            text: 'Отменить',
            onClick: cancel,
        },
    ]

    if (order.order_types_id === 2) {
        items.push({
            id: 2,
            icon: <AiOutlineCheck />,
            text: 'Готово к получению',
            onClick: ready,
        })

        items.push({
            id: 3,
            icon: <AiOutlineCheck />,
            text: 'Получено',
            onClick: getted,
        })
    } else {
        items.push({
            id: 4,
            icon: <AiOutlineCheck />,
            text: 'Доставлено',
            onClick: deliv,
        })
    }

    return (
        <>
            <tr className={styles.OrderTable__tableRaw}>
                <td>{order.id}</td>
                <td>
                    {order.users.id}: {order.users.phone_number}
                </td>
                <td
                    onClick={showHandler}
                    className={styles.OrderTable__items}
                >
                    Товары
                </td>
                <td>{strDate}</td>
                <td>{sum}р</td>
                <td>{order.order_types_id === 1 ? 'Доставка' : 'Самовывоз'}</td>
                <td>
                    {order.payment_status_id === 1
                        ? 'Оплачено'
                        : 'При получении'}
                </td>
                <td style={{ display: 'inline-flex', gap: '10px' }}>
                    <OrderStatus statusId={order.operations_status_id} />
                    <MyMenu items={items} />
                </td>
            </tr>
            {showItems && <InfoTable info={order.delivery_info} />}
        </>
    )
}

const OrdersRedactorPage: FC<OrdersRedactorPageProps> = () => {
    const viewCount = 10

    const [filter, setFulter] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [cacheCount, setCacheCount] = useState(null)

    const dbSearch = useDebounce(search)

    const { data, error, loading } = useQuery(GET_ADMIN_ORDERS, {
        variables: {
            skip: viewCount * (page - 1),
            take: viewCount,
            operStatus: filter,
            search: dbSearch,
        },
    })

    useEffect(() => {
        setPage(1)
    }, [filter])

    const nextPage = () => {
        setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        setPage((prev) => prev - 1)
    }

    const orders = data ? data.getAdminOrders.data : null
    const count = data ? data.getAdminOrders.count : null
    if (count !== null && count !== cacheCount) setCacheCount(count)

    return (
        <div className={styles.OrdersRedactorPage}>
            <div className={styles.OrdersRedactorPage__container}>
                <FilterPanel
                    onChangeFilte={setFulter}
                    onChangeText={setSearch}
                    defaultValue={2}
                />
                {!error && (
                    <>
                        <OrderTable
                            orders={orders}
                            loading={loading}
                        />

                        <div className={styles.OrdersRedactorPage__navPanel}>
                            <Button
                                disable={page === 1}
                                onClick={prevPage}
                            >
                                Назад
                            </Button>

                            <div className={styles.OrdersRedactorPage__navInfo}>
                                {viewCount * (page - 1) + 1} -{' '}
                                {viewCount * page > cacheCount
                                    ? cacheCount
                                    : viewCount * page}{' '}
                                из {cacheCount}
                            </div>

                            <Button
                                disable={viewCount * page >= cacheCount}
                                onClick={nextPage}
                            >
                                Далее
                            </Button>
                        </div>
                    </>
                )}

                {/* <MyMenu items={items} /> */}

                {/* <OrdersList /> */}
            </div>
        </div>
    )
}

export default OrdersRedactorPage
