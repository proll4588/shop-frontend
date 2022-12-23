import { ISubGoodsTypes } from './goodsTypes.interface'

export interface IGood {
    id: number
    name: string
    description?: string

    main_photo: IPhoto
    all_photos?: IPhoto[]

    current_price: Price
    all_prices?: Price[]

    brands: IBrand
    sub_type_goods?: ISubGoodsTypes

    avg_rating: {
        count: number
        avg: number
    }

    storage?: {
        count: number
    }
}

export interface IPhoto {
    id: number
    goods_catalog_id?: number
    photo: string
}

export interface IBrand {
    id: number
    name: string
    logo: string | null
}

export interface Price {
    date: string
    price: number
    discount: number
}
