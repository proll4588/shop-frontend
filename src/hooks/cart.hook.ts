import {
    GET_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CART,
} from './../apollo/fetchs'
import { useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import countsAtom from '../atoms/counts.atom'

const useCart = () => {
    const setCounts = useSetRecoilState(countsAtom)

    const { data, error, loading } = useQuery(GET_CART)

    const [add, addInfo] = useMutation(ADD_TO_CART, {
        refetchQueries: [{ query: GET_CART }],
    })
    const [remove, remInfo] = useMutation(REMOVE_FROM_CART, {
        refetchQueries: [{ query: GET_CART }],
    })
    const [change, changeInfo] = useMutation(CHANGE_CART, {
        refetchQueries: [{ query: GET_CART }],
    })

    const addToCart = (goodId, count) => {
        setCounts((prev) => ({ ...prev, cart: prev.cart + 1 }))
        add({
            variables: {
                goodId,
                count,
            },
        })
    }

    const removeFromCart = (goodId) => {
        setCounts((prev) => ({ ...prev, cart: prev.cart - 1 }))
        remove({
            variables: {
                goodId,
            },
        })
    }

    const changeInCart = (goodId, count) => {
        change({
            variables: {
                goodId,
                count,
            },
        })
    }

    return { addToCart, removeFromCart, changeInCart, data, loading, error }
}

export default useCart
