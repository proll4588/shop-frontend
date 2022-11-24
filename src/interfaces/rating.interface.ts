export default interface IRating {
    id: number
    users_id?: number
    users: {
        id: number
        fname?: string
        lanme?: string
        photo?: string
    }
    rating: number
    text?: string
    date: string
}
