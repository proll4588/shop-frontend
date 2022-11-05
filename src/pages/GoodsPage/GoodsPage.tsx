/* Хуки */
import React, { FC, useEffect, useState } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
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
    ADD_TO_FAVORITE,
    GET_DATA_FOR_GOODS_PAGE,
    GET_FAVORITE,
    IGetDataForGoodsPage,
    REMOVE_FROM_FAVORITE,
} from '../../apollo/fetchs'

/* Сторонние библиотеки */
import classNames from 'classnames'

/*
 * Компонент-страниц. Отвечает за отображение страницы с товарами
 * определённого типа с возможностью фильтрации.
 */
const GoodsPage: FC<GoodsPageProps> = () => {
    // Получаем id типа товара из адресса страницы
    const { subGoodsTypeId } = useParams()
    const client = useApolloClient()

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

    // Запрос на товары в избранном
    const favInfo = useQuery(GET_FAVORITE)

    const [addToFav, addInfo] = useMutation(ADD_TO_FAVORITE)
    const [remFromFav, remInfo] = useMutation(REMOVE_FROM_FAVORITE)

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

    useEffect(() => {
        if (addInfo.data || remInfo.data) {
            client.refetchQueries({
                include: [GET_FAVORITE],
            })
        }
    }, [addInfo.data, remInfo.data])

    // В случае ошибки выводить грустный смайлик
    if (error) return <p>Error :(</p>

    return (
        <div
            className={classNames(
                styles.GoodsPage,
                isPanelOpen ? styles.GoodsPage_fix : ''
            )}
        >
            {/* TODO: ХЗ надо или нет. Занимает много места */}
            {/* <RouteTitle
                path={'Main / Catalog'}
                title={'Catalog'}
            /> */}
            <div className={styles.GoodsPage__container}>
                {/* TODO: В отдкльный компонент */}
                <div
                    className={classNames(
                        styles.GoodsPage__FilterPanel,
                        isPanelOpen ? styles.GoodsPage__FilterPanel_open : ''
                    )}
                >
                    {/* TODO: Сдлеать loader в момент получения данных */}
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
                            favorite={favInfo.data && favInfo.data.getFavorite}
                            addToFavorite={(goodId) => {
                                addToFav({
                                    variables: {
                                        goodId,
                                    },
                                })
                            }}
                            removeFromFavorite={(goodId) => {
                                remFromFav({
                                    variables: {
                                        goodId,
                                    },
                                })
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GoodsPage
