import { IGlobalGoodsTypes } from './goodsTypes.interface'
export interface IBuyStats {
    date: string
    profit: number
}

export interface IGlobalTypeStats {
    startDate: string
    endDate: string
    data: {
        profit: number
        globalType: IGlobalGoodsTypes
    }[]
}
