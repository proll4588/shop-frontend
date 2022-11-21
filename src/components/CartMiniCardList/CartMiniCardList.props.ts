import { IGood } from './../../interfaces/good.interface'

export default interface CartMiniCardListProps {
    goods: IGood[]
    col: {
        goodId: number
        col: number
    }[]

    onDel?: (goodId) => void
    onChangeCol?: (goodId, col) => void
}
