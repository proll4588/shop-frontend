import { gql } from '@apollo/client'

export const GET_ALL_GOODS_TYPES = gql`
    query GetAllGoodsTypes {
        types {
            photo
            name
            id
            local_type_goods {
                id
                name
                photo
                sub_type_goods {
                    id
                    name
                    photo
                }
            }
        }
    }
`

export const GET_GOODS = gql`
    query GetGoods($search: String, $subId: Int) {
        goods(search: $search, subId: $subId) {
            id
            name
            main_photo
            description
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            prices {
                price
                discount
            }
        }
    }
`

export const GET_BRANDS = gql`
    query GetBrands($subId: Int) {
        brands(subId: $subId) {
            name
            id
            logo
        }
    }
`

export const GET_DATA_FOR_GOODS_PAGE = gql`
    query GetDataForGoodsPage($search: String, $subId: Int, $filters: Filters) {
        goods(search: $search, subId: $subId, filters: $filters) {
            id
            name
            main_photo
            description
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            prices {
                price
                discount
            }
        }
        brands(subId: $subId) {
            name
            id
            logo
        }
    }
`
