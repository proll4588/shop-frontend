import {
    IGlobalGoodsTypes,
    ILocalGoodsTypes,
    ISubGoodsTypes,
} from './goodsTypes.interface'
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

export interface ILocalTypeStats {
    startDate: string
    endDate: string
    data: {
        profit: number
        localType: ILocalGoodsTypes
    }[]
}

export interface ISubTypeStats {
    startDate: string
    endDate: string
    data: {
        profit: number
        subType: ISubGoodsTypes
    }[]
}
