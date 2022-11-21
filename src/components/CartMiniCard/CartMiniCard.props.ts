import { IGood } from './../../interfaces/good.interface'

export default interface CartMiniCardProps {
    good: IGood
    col?: number
    onChangeCol?: (col: number) => void
    onDel?: () => void
}
