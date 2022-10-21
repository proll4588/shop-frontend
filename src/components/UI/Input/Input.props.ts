import { ReactNode } from 'react'

export default interface InputProps {
    className?: string
    type: 'text' | 'password' | 'number'
    value: string
    icon?: ReactNode
    isError?: boolean
    placeholder?: string
    onChange?: (value: string) => void
}
