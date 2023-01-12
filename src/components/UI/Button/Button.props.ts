import { HTMLAttributes } from 'react'

export default interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    large?: boolean
    secondary?: boolean
    disable?: boolean
    isSubmite?: boolean
}
