import { useEffect } from 'react'
/* Хуки */
import { useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

/* Запросы */
import {
    GET_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CART,
} from './../apollo/fetchs'

/* Атомы */
import countsAtom from '../atoms/counts.atom'

/* Пдсчёт кол-во товара в корзине */
const cartCalc = (cart) => {
    let sum = 0

    cart.forEach((el) => {
        sum += el.count
    })

    return sum
}

/*
 * Хук для работы с корзиной
 * Используется только если пользователь авторизирован
 *
 * === Функции ===
 * addToCart - добавление товара в корзину пользователя
 *  goodId - id торвара
 *  count - кол-во товара
 *
 * removeFromCart - удаление товара из корзины
 *  goodId - id торвара
 *
 * changeInCart - изменение кол-во товара в корзине
 *  goodId - id торвара
 *  count - кол-во товара
 *
 *
 * === Поля ===
 * cartList - список товаров в корзине
 * error - ошибки запросов
 * isGetLoading - в процессе получения избранных товаров
 * isAddLoading - в процесее добавления товара в корзину
 * isRemoveLoading - в процесее удаления товара из коризы
 * isChangeLoading - в процесее изменения кол-во товара в корзине
 */
const useCart = () => {
    // Сетер атома с числом кол-во товара в корзине
    const setCounts = useSetRecoilState(countsAtom)

    /* == Запросы == */
    // Получение товаров в корзине
    const { data, error, loading } = useQuery(GET_CART)

    // Добавление товара в корзину
    const [add, addInfo] = useMutation(ADD_TO_CART, {
        refetchQueries: [{ query: GET_CART }],
    })

    // Удаление товара из корзины
    const [remove, remInfo] = useMutation(REMOVE_FROM_CART, {
        refetchQueries: [{ query: GET_CART }],
    })

    // Изменение кол-во товара в корзине
    const [change, changeInfo] = useMutation(CHANGE_CART, {
        refetchQueries: [{ query: GET_CART }],
    })
    /* =========================================================== */

    // Обновление кол-во товара корзины в атоме при каждом новом
    // запросе
    useEffect(() => {
        if (data && data.getCart)
            setCounts((prev) => ({ ...prev, cart: cartCalc(data.getCart) }))
    }, [data])

    // Добаление товара в коризу
    const addToCart = (goodId, count) => {
        add({
            variables: {
                goodId,
                count,
            },
        })
    }

    // Удаление товара из корзины
    const removeFromCart = (goodId) => {
        remove({
            variables: {
                goodId,
            },
        })
    }

    // Изменение кол-во товара в корзине
    const changeInCart = (goodId, count) => {
        change({
            variables: {
                goodId,
                count,
            },
        })
    }

    return {
        addToCart,
        removeFromCart,
        changeInCart,
        cartList: data !== undefined ? data.getCart : undefined,
        error: error || addInfo.error || remInfo.error || changeInfo.error,
        isGetLoading: loading,
        isAddLoading: addInfo.loading,
        isRemoveLoading: remInfo.loading,
        isChangeLoading: changeInfo.loading,
    }
}

export default useCart
