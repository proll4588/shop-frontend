export default interface PaginationProps {
    startPage: number
    totalCount: number
    step?: number
    onChangePage?: (page: number) => void
}
