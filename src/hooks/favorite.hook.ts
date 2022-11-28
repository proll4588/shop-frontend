import { useEffect } from 'react'
// Хуки
import { useSetRecoilState } from 'recoil'
import { useQuery, useMutation } from '@apollo/client'

// Запросы
import {
    GET_FAVORITE,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
} from './../apollo/fetchs'

// Атомы
import countsAtom from '../atoms/counts.atom'

/*
 * Хук для работы со список избранных товаров пользователя
 * Используется только если пользователь авторизирован
 *
 * === Функции ===
 * addToFavorite - добавление товара в избранное
 *  goodId - id товара
 *
 * removeFromFavorite - удаление товара из избранного
 *  goodId - id товара
 *
 *
 * === Поля ===
 * favoriteList - массив избранных товаров
 * error - ошибки запросов
 *
 * isGetLoading - в процесее получения избранных товаров
 * isAddLoading - в процессе добавления товара в избранное
 * isRemoveLoading - в процессе удаления товара из избранного
 */
const useFavorite = () => {
    // Сетер атома с числом избранных товаров
    const setCounts = useSetRecoilState(countsAtom)

    /* == Запросы на товары в избранном == */
    // Получение избранных товаров
    const { data, error, loading } = useQuery(GET_FAVORITE)

    // Добавление в избранные
    const [add, addInfo] = useMutation(ADD_TO_FAVORITE, {
        refetchQueries: [{ query: GET_FAVORITE }],
    })

    // Удаление из избранных
    const [remove, remInfo] = useMutation(REMOVE_FROM_FAVORITE, {
        refetchQueries: [{ query: GET_FAVORITE }],
    })
    /* =========================================================== */

    // Обновление кол-во избранных товаров в атоме при каждом новом
    // запросе
    useEffect(() => {
        if (data && data.getFavorite)
            setCounts((prev) => ({
                ...prev,
                favorite: data.getFavorite.length,
            }))
    }, [data])

    // Добавление в избранное
    const addToFavorite = (goodId) => {
        add({
            variables: {
                goodId,
            },
        })
    }

    // Удаление из избранного
    const removeFromFavorite = (goodId) => {
        remove({
            variables: {
                goodId,
            },
        })
    }

    return {
        addToFavorite,
        removeFromFavorite,
        favoriteList: data !== undefined ? data.getFavorite : undefined,
        error: error || addInfo.error || remInfo.error,
        isGetLoading: loading,
        isAddLoading: addInfo.loading,
        isRemoveLoading: remInfo.loading,
    }
}

export default useFavorite
