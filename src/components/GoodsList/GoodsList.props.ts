import { IGood } from '../../interfaces/good.interface'

export default interface GoodsListProps {
    data: IGood[]
    onPanelOpen?: () => void
}
