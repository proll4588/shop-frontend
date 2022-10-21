export interface IGlobalGoodsTypes {
    id: number

    photo: string | null
    name: string

    local_type_goods?: ILocalGoodsTypes[]
}

export interface ILocalGoodsTypes {
    id: number

    photo: string | null
    name: string

    sub_type_goods?: ISubGoodsTypes[]
}

export interface ISubGoodsTypes {
    id: number

    photo: string | null
    name: string
}
