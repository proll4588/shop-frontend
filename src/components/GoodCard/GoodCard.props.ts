import { IGood } from '../../interfaces/good.interface'

export default interface GoodCardProps {
    className?: string
    data: IGood
    isFull?: boolean

    onClickFavorite?: (value: boolean) => void
    onClickCart?: () => void

    isfavorite?: boolean
}
