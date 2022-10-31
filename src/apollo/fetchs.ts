import { IGlobalGoodsTypes } from './../interfaces/goodsTypes.interface'
import { IGood } from './../interfaces/good.interface'
import { gql } from '@apollo/client'
import IAllFilters from '../interfaces/IResponseFilters.interface'
import { ICharacteristics } from '../interfaces/characteristics.interface'

export interface IGetAllGoodsTypes {
    types: IGlobalGoodsTypes[]
}
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

// Марально устарело и вообще не надо
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

export interface IGetDataForGoodsPage {
    filteredGoods: IGood[]
    filters: IAllFilters
}
export const GET_DATA_FOR_GOODS_PAGE = gql`
    query GetDataForGoodsPage($subId: Int!, $filters: AllFilterState) {
        filteredGoods(subId: $subId, filters: $filters) {
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
        filters(subId: $subId) {
            typeFilters {
                id
                name
                type
                data {
                    ... on FilterListData {
                        values {
                            id
                            value
                        }
                    }
                    ... on FilterRangeData {
                        id
                        max
                        min
                    }
                }
            }
            generalFilters {
                price {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
                brand {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
            }
        }
    }
`

// export interface IGetGood {
//     good: IGood
//     goodCharacteristics: ICharacteristics
// }
export const GET_GOOD = gql`
    query GetGood($goodId: Int!) {
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
    goodCharacteristics: ICharacteristics
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
        goodCharacteristics(goodId: $goodId) {
            id
            name
            items {
                id
                name
                value
                description
            }
        }
    }
`
