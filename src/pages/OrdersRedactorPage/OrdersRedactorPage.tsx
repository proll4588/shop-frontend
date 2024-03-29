import React, { FC, useEffect, useState } from 'react'
import styles from './OrdersRedactorPage.module.scss'
import OrdersRedactorPageProps from './OrdersRedactorPage.props'
import { IOrder } from '../../interfaces/order.interface'
import useDebounce from '../../hooks/debounce.hook'
import { useMutation, useQuery } from '@apollo/client'
import {
    GET_ADMIN_ORDERS,
    GET_BUY_DYNAMIC_BY_YEAR,
    GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
    GET_MONTH_STATS,
    UPDATE_ORDER_STATUS,
} from '../../apollo/fetchs'
import { FilterPanel, InfoTable, OrderStatus } from '../OrdersPage'
import MyMenu from '../../components/MyMenu/MyMenu'
import { TiDeleteOutline } from 'react-icons/ti'
import Loader from '../../components/UI/Loader/Loader'
import { AiOutlineCheck } from 'react-icons/ai'
import Button from '../../components/UI/Button/Button'
import Pagination from '../../components/Pagination/Pagination'

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

    const [update] = useMutation(UPDATE_ORDER_STATUS, {
        update: async (cache, change) => {
            cache.modify({
                id: cache.identify(change.data.updateOrderStatus),
                fields: {
                    operations_status_id: (cachedData) => {
                        return cachedData
                    },
                },
            })
        },
        refetchQueries: [
            GET_MONTH_STATS,
            GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
            GET_BUY_DYNAMIC_BY_YEAR,
        ],
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
        sum += info.price
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
            id: 3,
            icon: <AiOutlineCheck />,
            text: 'Получено',
            onClick: getted,
        })

        if (order.operations_status_id === 1) {
            items.push({
                id: 2,
                icon: <AiOutlineCheck />,
                text: 'Готово к получению',
                onClick: ready,
            })
        }
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
                    {(order.operations_status_id === 5 ||
                        order.operations_status_id === 1) && (
                        <MyMenu items={items} />
                    )}
                </td>
            </tr>
            {showItems && <InfoTable info={order.delivery_info} />}
        </>
    )
}

const OrdersRedactorPage: FC<OrdersRedactorPageProps> = () => {
    const viewCount = 10

    const [filter, setFulter] = useState('inProc')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [cacheCount, setCacheCount] = useState(null)

    const dbSearch = useDebounce(search)

    const { data, error, loading, fetchMore } = useQuery(GET_ADMIN_ORDERS, {
        variables: {
            skip: 0,
            take: viewCount,
            operStatus: filter,
            search: dbSearch,
        },
    })

    const getMore = (page) => {
        fetchMore({
            variables: {
                skip: viewCount * (page - 1),
                take: viewCount,
                operStatus: filter,
                search: dbSearch,
            },
            updateQuery(previousQueryResult, options) {
                return options.fetchMoreResult
            },
        })
    }

    useEffect(() => {
        setPage(1)
    }, [filter, dbSearch])

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

                        <Pagination
                            startPage={page}
                            totalCount={cacheCount}
                            onChangePage={(p) => {
                                setPage(p)
                                if (page !== p) getMore(p)
                            }}
                            step={viewCount}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default OrdersRedactorPage
