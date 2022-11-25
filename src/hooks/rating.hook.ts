import { useEffect } from 'react'
import {
    UPDATE_GOOD_RATING,
    CREATE_GOOD_RATING,
    DELETE_GOOD_RATING,
    GET_GOOD_RATING,
} from './../apollo/fetchs'
import { useMutation } from '@apollo/client'

const useRating = (goodId) => {
    const [update, updateData] = useMutation(UPDATE_GOOD_RATING, {
        refetchQueries: [{ query: GET_GOOD_RATING, variables: { goodId } }],
    })
    const [create, createData] = useMutation(CREATE_GOOD_RATING, {
        refetchQueries: [{ query: GET_GOOD_RATING, variables: { goodId } }],
    })
    const [qdelete, qdeleteData] = useMutation(DELETE_GOOD_RATING, {
        refetchQueries: [{ query: GET_GOOD_RATING, variables: { goodId } }],
    })

    const updateRating = (rating, text) => {
        update({
            variables: {
                goodId,
                rating,
                text,
            },
        })
    }

    const deleteRating = () => {
        qdelete({
            variables: {
                goodId,
            },
        })
    }

    const createRating = (rating, text) => {
        create({
            variables: {
                goodId,
                rating,
                text,
            },
        })
    }

    return { createRating, updateRating, deleteRating }
}

export default useRating
