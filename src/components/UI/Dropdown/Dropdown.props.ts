export default interface DropdownProps {
    content: string[]
    defaultVal?: number
    placeholder?: string
    onChange?: (name: string) => void
    isError?: boolean
    className?: string
}
