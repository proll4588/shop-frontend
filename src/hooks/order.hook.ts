import { GET_CART, GET_ORDERS } from './../apollo/fetchs'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_ORDER } from '../apollo/fetchs'

/* Статусы оплаты */
export enum PAY_STATUSES {
    notPay = 'notPay',
    pay = 'pay',
}

/* Типы доставок */
export enum ORDER_TYPES {
    deliver = 'deliver',
    fromShop = 'fromShop',
}

/*
 * Хук для работы с заказами
 * Используется только если пользователь авторизирован
 *
 *
 * === Функции ===
 * createOrder - создание нового заказа
 *  payStatus - статус оплаты (или тип оплаты)
 *  orderType - тип доставки товара
 *
 *
 * === Поля ===
 * orderList - список заказов пользователя
 * isGetLoading - в процесее получения списка заказов
 * isCreateLoading - в процессе создания заказа
 * error - ошибки
 */
const useOrder = () => {
    /* == Запросы == */
    // Получение списка заказов
    const { data, loading, error } = useQuery(GET_ORDERS)

    // Создание нового заказа
    const [qcreateOrder, createData] = useMutation(CREATE_ORDER, {
        refetchQueries: [{ query: GET_CART }, { query: GET_ORDERS }],
    })
    /* =========================================================== */

    // Создание нового заказа
    const createOrder = (payStatus: PAY_STATUSES, orderType: ORDER_TYPES) => {
        qcreateOrder({
            variables: {
                payStatus,
                orderType,
            },
        })
    }

    return {
        orderList: data,
        isGetLoading: loading,
        isCreateLoading: createData.loading,
        error: error || createData.error,
        createOrder,
    }
}

export default useOrder
