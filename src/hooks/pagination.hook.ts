import { useEffect, useState } from 'react'

const usePagintion = (viewCount: number, totalCount: number, startPage = 1) => {
    const [page, setPage] = useState(startPage)

    useEffect(() => {
        setPage(startPage)
    }, [startPage])

    const nextPage = () => {
        if (viewCount * page < totalCount) setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1)
    }

    return { nextPage, prevPage, page }
}

export default usePagintion
