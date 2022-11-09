import { useLayoutEffect } from 'react'
import {
    GET_FAVORITE,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
} from './../apollo/fetchs'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'

const useFavorite = () => {
    const client = useApolloClient()

    /* Запросы на товары в избранном */
    const { data, error, loading } = useQuery(GET_FAVORITE)
    const [add, addInfo] = useMutation(ADD_TO_FAVORITE)
    const [remove, remInfo] = useMutation(REMOVE_FROM_FAVORITE)
    /* =========================================================== */

    // Перезапрос избранных товаров при добавления нового или удаления уже имеющего
    useLayoutEffect(() => {
        if (addInfo.data || remInfo.data) {
            client.refetchQueries({
                include: [GET_FAVORITE],
            })
        }
    }, [addInfo.data, remInfo.data])

    const addToFavorite = (goodId) => {
        add({
            variables: {
                goodId,
            },
        })
    }

    const removeFromFavorite = (goodId) => {
        remove({
            variables: {
                goodId,
            },
        })
    }

    return { addToFavorite, removeFromFavorite, data, error, loading }
}

export default useFavorite