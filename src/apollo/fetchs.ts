import { gql } from '@apollo/client'

export const GET_GOODS = gql`
    query GetGoods {
        goods {
            gcName
            gcDescription
            gcCost
        }
    }
`
