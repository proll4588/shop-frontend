export default interface CheckboxListProps {
    data: {
        id: number
        name: string
    }[]
    onChange?: (states: { id: number; state: boolean }[]) => void
}
