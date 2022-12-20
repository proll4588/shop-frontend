export default interface MyComboboxProps {
    elements: { id: number; name: string }[]
    onQuering?: (q: string) => void
    onSelect?: (id: number) => void
    defaultValue?: { id: number; name: string }
    loading?: boolean
}
