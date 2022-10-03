export default interface GoodsTypeListProps {
    data: GoodsTypeData[]
}

interface GoodsTypeData {
    id: number
    photo: string | null
    name: string
    href: string
}
