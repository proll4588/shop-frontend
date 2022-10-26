import { ReactNode } from 'react'
export default interface SquareProps {
    string?: string
    icon?: ReactNode
    className?: string

    onClick?: () => void

    active?: boolean
    error?: boolean
    disasble?: boolean
}
