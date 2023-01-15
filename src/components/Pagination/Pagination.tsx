import React, { FC, useEffect } from 'react'
import styles from './Pagination.module.scss'
import PaginationProps from './Pagination.props'
import Button from '../UI/Button/Button'
import usePagintion from '../../hooks/pagination.hook'

const Pagination: FC<PaginationProps> = ({
    startPage,
    totalCount,
    step = 10,
    onChangePage,
}) => {
    const { nextPage, page, prevPage } = usePagintion(
        step,
        totalCount,
        startPage
    )

    useEffect(() => {
        onChangePage && onChangePage(page)
    }, [page])

    useEffect(() => {
        console.log('pag >> mount')
        return () => {
            console.log('pag >> Un mount')
        }
    }, [])

    return (
        <div className={styles.Pagination}>
            <Button
                disable={page === 1}
                onClick={prevPage}
            >
                Назад
            </Button>

            <div className={styles.Pagination__navInfo}>
                {step * (page - 1) + 1} -{' '}
                {step * page > totalCount ? totalCount : step * page} из{' '}
                {totalCount}
            </div>

            <Button
                disable={step * page >= totalCount}
                onClick={nextPage}
            >
                Далее
            </Button>
        </div>
    )
}

export default Pagination
