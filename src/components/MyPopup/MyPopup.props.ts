import { ReactNode } from 'react'

export default interface MyPopupProps {
    children: ReactNode
    title?: string
    close: () => void
    isOpen: boolean
}
