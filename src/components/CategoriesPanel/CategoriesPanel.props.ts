import { HTMLAttributes } from 'react'
import { IGlobalGoodsTypes } from '../../interfaces/goodsTypes.interface'

export default interface CategoriesPanelProps
    extends HTMLAttributes<HTMLDivElement> {
    globalGoodsTypes: IGlobalGoodsTypes[]
    lock?: boolean
    startSelect?: boolean
}
