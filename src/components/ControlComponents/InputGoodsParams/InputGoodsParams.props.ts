export default interface InputGoodsParamsProps {
    type: 'choise' | 'text' | 'price'
    params?: {
        from?: string
        len?: number
    }
    onChange?: (val: number | string) => void
}
