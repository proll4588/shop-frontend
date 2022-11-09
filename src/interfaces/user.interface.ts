export interface IUser {
    id: number

    fname?: string
    lname?: string

    email: string
    phone_number?: string
    date_of_birthday?: string
    gender?: number
    address?: IAddress
    photo?: string
}

export interface IAddress {
    id: number
    city?: string
    street?: string
    ZIP?: number
    country?: string
}

export interface IUserData {
    user?: IUserInfo
    address?: IAddresInfo
}

export interface IUserInfo {
    fname?: string
    lname?: string
    email?: string
    phone_number?: string
    date_of_birthday?: string
    gender?: boolean
    photo?: string
}

export interface IAddresInfo {
    country?: string
    city?: string
    street?: string
    ZIP?: number
}
