export default interface MyMenuProps {
    items: {
        id: number
        icon: any
        text: string
        onClick: () => void
    }[]
}
