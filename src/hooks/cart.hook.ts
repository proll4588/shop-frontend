import { useLayoutEffect } from 'react';
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CART } from './../apollo/fetchs';
import { useApolloClient, useMutation, useQuery } from "@apollo/client"


const useCart = () => {
    const client = useApolloClient()

    const { data, error, loading } = useQuery(GET_CART)

    const [add, addInfo] = useMutation(ADD_TO_CART)
    const [remove, remInfo] = useMutation(REMOVE_FROM_CART)
    const [change, changeInfo] = useMutation(CHANGE_CART)

    useLayoutEffect(() => {
        if (addInfo.data || remInfo.data || changeInfo.data) {
            client.refetchQueries({
                include: [GET_CART],
            })
        }
    }, [addInfo.data, remInfo.data, changeInfo.data])

    const addToCart = (goodId, count) => {
        add({
            variables: {
                goodId,
                count
            }
        })
    }

    const removeFromCart = (goodId) => {
        remove({
            variables: {
                goodId
            }
        })
    }

    const changeInCart = (goodId, count) => {
        change({
            variables: {
                goodId,
                count
            }
        })
    }

    return {addToCart, removeFromCart, changeInCart, data, loading, error}
}

export default useCart