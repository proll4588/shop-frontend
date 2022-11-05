import { IGood } from '../../interfaces/good.interface'

export default interface GoodsListProps {
    data: IGood[]
    favorite?: {
        id: number
        goods_catalog_id: number
        users_id: number
    }[]

    addToFavorite?: (goodId: number) => void
    removeFromFavorite?: (goodId: number) => void

    onPanelOpen?: () => void
}
