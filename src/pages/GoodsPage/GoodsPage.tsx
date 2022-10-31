/* Хуки */
import React, { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

/* Компоненты */
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import GoodsList from '../../components/GoodsList/GoodsList'
import RouteTitle from '../../components/RouteTitle/RouteTitle'

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

    // Кэширование брэндов для избежания обновления интерфейса
    useEffect(() => {
        if (!loading && !error) {
            setCacheFilters(data.filters)
            // TODO: можно вынести в отдельную функцию
            if (filtersState === null) {
                setFiltersState({
                    generalFilters: {
                        brand: [],
                        price: { max: null, min: null },
                    },
                    typeFilters: data.filters.typeFilters.map((filter) => ({
                        id: filter.id,
                        state:
                            'values' in filter.data
                                ? []
                                : { max: null, min: null },
                    })),
                })
            }
            /*=========================================*/
        }
    }, [data, loading, error])

    // TODO: DEV
    // useEffect(() => {
    //     console.log('filtersState', filtersState)
    // }, [filtersState])

    // В случае ошибки выводить грустный смайлик
    if (error) return <p>Error :(</p>

    // TODO: DEV
    // console.log(data)

    return (
        <div className={styles.GoodsPage}>
            {/* TODO: ХЗ надо или нет. Занимает много места */}
            {/* если оставлять то перенести в layout */}
            {/* <RouteTitle
                path={'Main / Catalog'}
                title={'Catalog'}
            /> */}
            <div className={styles.GoodsPage__container}>
                <div className={styles.GoodsPage__FilterPanel}>
                    {/* TODO: Сдлеать loader в момент получения данных */}
                    {!!cacheFilters && !!filtersState && (
                        <FilterPanel
                            filters={cacheFilters}
                            onChange={setFiltersState}
                            value={filtersState}
                        />
                    )}
                </div>
                <div className={styles.GoodsPage__GoodsList}>
                    {/* TODO: Сдлеать loader в момент получения данных */}
                    {!loading && !error && (
                        <GoodsList data={loading ? [] : data.filteredGoods} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GoodsPage
