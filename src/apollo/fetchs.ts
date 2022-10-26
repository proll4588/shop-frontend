import { IGood } from './../interfaces/good.interface'
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
            description
            main_photo {
                photo
            }
            current_price {
                price
                discount
            }
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
            description
            main_photo {
                photo
            }
            current_price {
                price
                discount
            }
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
        }
        brands(subId: $subId) {
            name
            id
            logo
        }
    }
`
export const GET_GOOD = gql`
    query Goods($goodId: Int!) {
        good(id: $goodId) {
            id
            name
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                price
                discount
            }
            all_prices {
                price
                discount
            }
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
            description
        }
    }
`

export interface IGetDataForGoodPage {
    good: IGood
}

export const GET_DATA_FOR_GOOD_PAGE = gql`
    query GetDataForGoodPage($goodId: Int!) {
        good(id: $goodId) {
            id
            name
            description
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                price
                discount
            }
            all_prices {
                price
                discount
            }
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
        }
    }
`
