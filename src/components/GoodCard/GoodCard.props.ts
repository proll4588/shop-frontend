import { IGood } from '../../interfaces/good.interface'

export default interface GoodCardProps {
    className?: string
    data: IGood
    isFull?: boolean
}
