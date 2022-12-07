import { IGood, Price } from './good.interface'

export interface IOrder {
    id: number
    date: string
    operations_status_id: number
    payment_status_id: number
    order_types_id: number
    delivery_info: IDeliveryInfo[]
}

export interface IDeliveryInfo {
    id: number
    goods_catalog: IGood
    count: number
    prices: Price
}
