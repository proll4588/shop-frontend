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

export const GET_ALL_GOODS_TYPES = gql`
    query GetAllGoodsTypes {
        types {
            photo
            name
            id
            localGoodsTypes {
                id
                name
                photo
                subGoodsTypes {
                    id
                    name
                    photo
                }
            }
        }
    }
`

export const GET_ALL_GOODS_BY_SUB_ID = gql`
    query GetAllGoodsBySubId($subId: Int!) {
        goods(subId: $subID) {
            
        }
    }
`
