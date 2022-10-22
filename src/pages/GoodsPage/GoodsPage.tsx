/* Хуки */
import React, { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

/* Компоненты */
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import GoodsList from '../../components/GoodsList/GoodsList'

/* Интерфейсы */
import { IFilters } from '../../components/FilterPanel/FilterPanel.props'
import { IBrand } from '../../interfaces/good.interface'

/* Атрибуты компонента */
import styles from './GoodsPage.module.scss'
import GoodsPageProps from './GoodsPage.props'

/* Запросы */
import { GET_DATA_FOR_GOODS_PAGE } from '../../apollo/fetchs'
import RouteTitle from '../../components/RouteTitle/RouteTitle'

/*
 * Компонент-страниц. Отвечает за отображение страницы с товарами
 * определённого типа с возможностью фильтрации.
 */
const GoodsPage: FC<GoodsPageProps> = () => {
    // Получаем id типа товара из адресса страницы
    const { subGoodsTypeId } = useParams()

    // Состояние фильтра и список товаров. Поседний нужен для кэширования
    const [filters, setFilters] = useState<IFilters>(null)
    const [brands, setBrands] = useState<IBrand[]>(null)

    // Запрашиваем данные с сервера с учётом фильтров и типа товара
    const { loading, error, data } = useQuery(GET_DATA_FOR_GOODS_PAGE, {
        variables: {
            subId: Number(subGoodsTypeId),
            filters: filters ? filters : undefined,
        },
    })

    // Кэширование брэндов для избежания обновления интерфейса
    useEffect(() => {
        !loading && !error && setBrands(data.brands)
    }, [data, loading, error])

    // В случае ошибки выводить грустный смайлик
    if (error) return <p>Error :(</p>

    return (
        <div className={styles.GoodsPage}>
            {/* TODO: ХЗ надо или нет. Занимает много места */}
            {/* если оставлять то перенести в layout */}
            <RouteTitle
                path={'Main / Catalog'}
                title={'Catalog'}
            />
            <div className={styles.GoodsPage__container}>
                <div className={styles.GoodsPage__FilterPanel}>
                    {brands && (
                        <FilterPanel
                            data={{
                                brands: brands,
                                price: { min: 0, max: 10000 },
                            }}
                            onChange={setFilters}
                            // TODO: Мб иерархичная ередача знаений выглядит не  очень. При обновлении фильтров, обнавляется и сама панель, надо этого избежать.
                            value={filters}
                        />
                    )}
                </div>
                <div className={styles.GoodsPage__GoodsList}>
                    {!loading && !error ? (
                        <GoodsList data={loading ? [] : data.goods} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default GoodsPage
