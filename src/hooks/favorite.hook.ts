import { useSetRecoilState } from 'recoil'
import {
    GET_FAVORITE,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
} from './../apollo/fetchs'
import { useQuery, useMutation } from '@apollo/client'
import countsAtom from '../atoms/counts.atom'

const useFavorite = () => {
    const setCounts = useSetRecoilState(countsAtom)

    /* Запросы на товары в избранном */
    const { data, error, loading } = useQuery(GET_FAVORITE)
    const [add, addInfo] = useMutation(ADD_TO_FAVORITE, {
        refetchQueries: [{ query: GET_FAVORITE }],
    })
    const [remove, remInfo] = useMutation(REMOVE_FROM_FAVORITE, {
        refetchQueries: [{ query: GET_FAVORITE }],
    })
    /* =========================================================== */

    const addToFavorite = (goodId) => {
        setCounts((prev) => ({ ...prev, favorite: prev.favorite + 1 }))
        add({
            variables: {
                goodId,
            },
        })
    }

    const removeFromFavorite = (goodId) => {
        setCounts((prev) => ({ ...prev, favorite: prev.favorite - 1 }))
        remove({
            variables: {
                goodId,
            },
        })
    }

    return { addToFavorite, removeFromFavorite, data, error, loading }
}

export default useFavorite
