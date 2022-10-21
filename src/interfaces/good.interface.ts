import { ISubGoodsTypes } from './goodsTypes.interface'

export interface IGood {
    id: number
    name: string
    description: string
    main_photo: string
    brands: IBrand
    sub_type_goods: ISubGoodsTypes
    prices: Prices
}

export interface IBrand {
    id: number
    name: string
    logo: string | null
}

export interface Prices {
    price: number
    discount: number
}
