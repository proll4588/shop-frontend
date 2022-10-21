export default interface FiltersMenuElementsProps {
    title: string
    type: 'range' | 'check'
    data: { min: number; max: number } | string[]
    onChange?: (data: { min: number; max: number } | string[]) => void
    value?: { min: number; max: number } | string[]
}
