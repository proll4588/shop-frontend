/* Хуки */
import React, { FC, useLayoutEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

/* Компоненты */
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import GoodsList from '../../components/GoodsList/GoodsList'

/* Интерфейсы */
import IAllFilters from '../../interfaces/IResponseFilters.interface'
import { IAllFilterState } from '../../components/FilterPanel/FilterPanel.props'

/* Атрибуты компонента */
import styles from './GoodsPage.module.scss'
import GoodsPageProps from './GoodsPage.props'

/* Запросы */
import {
    GET_DATA_FOR_GOODS_PAGE,
    IGetDataForGoodsPage,
} from '../../apollo/fetchs'

/* Сторонние библиотеки */
import classNames from 'classnames'

const createFilterState = (filters) => {
    return {
        generalFilters: {
            brand: [],
            price: { max: null, min: null },
        },
        typeFilters: filters.typeFilters.map((filter) => ({
            id: filter.id,
            state: 'values' in filter.data ? [] : { max: null, min: null },
        })),
    }
}

/*
 * Компонент-страниц. Отвечает за отображение страницы с товарами
 * определённого типа с возможностью фильтрации.
 */
const GoodsPage: FC<GoodsPageProps> = () => {
    // Получаем id типа товара из адресса страницы
    const { subGoodsTypeId } = useParams()

    // Состояние действующих и полученных. Поседний нужен для кэширования
    const [filtersState, setFiltersState] = useState<IAllFilterState>(null)
    const [cacheFilters, setCacheFilters] = useState<IAllFilters>(null)

    // Состояние открытости боковой панели
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)

    // Запрашиваем данные с сервера с учётом фильтров и типа товара
    const { loading, error, data } = useQuery<IGetDataForGoodsPage>(
        GET_DATA_FOR_GOODS_PAGE,
        {
            variables: {
                subId: Number(subGoodsTypeId),
                filters: filtersState,
            },
        }
    )

    // Кэширование брэндов для избежания обновления интерфейса и
    // создание объекта фильтров
    useLayoutEffect(() => {
        if (!loading && !error) {
            setCacheFilters(data.filters)
            if (filtersState === null)
                setFiltersState(createFilterState(data.filters))
        }
    }, [data, loading, error])

    // В случае ошибки выводить грустный смайлик
    if (error) return <p>Error :(</p>

    return (
        <div
            className={classNames(
                styles.GoodsPage,
                isPanelOpen ? styles.GoodsPage_fix : ''
            )}
        >
            <div className={styles.GoodsPage__container}>
                <div
                    className={classNames(
                        styles.GoodsPage__FilterPanel,
                        isPanelOpen ? styles.GoodsPage__FilterPanel_open : ''
                    )}
                >
                    {!!cacheFilters && !!filtersState && (
                        <FilterPanel
                            filters={cacheFilters}
                            onChange={(ans) => {
                                setIsPanelOpen(false)
                                setFiltersState(ans)
                            }}
                            value={filtersState}
                        />
                    )}

                    <div
                        className={styles.GoodsPage__FilterPanelBack}
                        onClick={() => {
                            setIsPanelOpen(false)
                        }}
                    />
                </div>

                <div className={styles.GoodsPage__GoodsList}>
                    {/* TODO: Сдлеать loader в момент получения данных */}
                    {!loading && !error && (
                        <GoodsList
                            onPanelOpen={() => {
                                setIsPanelOpen(true)
                            }}
                            data={data.filteredGoods}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GoodsPage
