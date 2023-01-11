/* Хуки */
import React, { FC, useLayoutEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

/* Компоненты */
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import GoodsList from '../../components/GoodsList/GoodsList'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import GoodCardTypeSwitcher from '../../components/UI/GoodCardTypeSwitcher/GoodCardTypeSwitcher'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'

/* Интерфейсы */
import { IAllFilterState } from '../../components/FilterPanel/FilterPanel.props'

/* Атрибуты компонента */
import styles from './GoodsPage.module.scss'
import GoodsPageProps from './GoodsPage.props'

/* Запросы */
import {
    GET_DATA_FOR_GOODS_PAGE,
    GET_FILTERS_BY_TYPE,
    IGetDataForGoodsPage,
} from '../../apollo/fetchs'

/* Сторонние библиотеки */
import classNames from 'classnames'

/* Создание объекта фильтров для отображения */
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

/* Возможности навигации */
const paginationConditions = (
    take: number,
    currentPage: number,
    totalCount: number
) => {
    return [currentPage > 1, (currentPage + 1) * take < totalCount + take]
}

/* Параметры сортировки */
const sortNames = [
    // 'Сортировка по умолчанию',
    'По возрастанию цены',
    'По убыванию цены',
]

/* Панель надо списком товаров */
const HeadList = ({ onPanelOpen, isFull, setIsFull, onChangeSort }) => {
    const sortChange = (val) => {
        switch (val) {
            case 'Сортировка по умолчанию':
                onChangeSort && onChangeSort(0)
                break

            case 'По возрастанию цены':
                onChangeSort && onChangeSort(1)
                break

            case 'По убыванию цены':
                onChangeSort && onChangeSort(2)
                break

            default:
                onChangeSort && onChangeSort(1)
                break
        }
    }

    return (
        <div className={styles.HeadList__head}>
            <Button
                secondary
                onClick={onPanelOpen}
                className={styles.HeadList__btnFilter}
            >
                Фильтры
            </Button>
            <GoodCardTypeSwitcher
                value={isFull}
                onChange={setIsFull}
            />
            <Dropdown
                content={sortNames}
                defaultVal={0}
                className={styles.HeadList__sortSelector}
                onChange={sortChange}
            />
        </div>
    )
}

// Компонент пагинация, служит для пролистывания списка товаров
const Pagination = ({ prevPage, nextPage, canPrev, canNext }) => {
    return (
        <div className={styles.GoodsPage__pagintaion}>
            <Button
                onClick={prevPage}
                disable={!canPrev}
            >
                <MdOutlineNavigateBefore />
            </Button>
            <Button
                onClick={nextPage}
                disable={!canNext}
            >
                <MdOutlineNavigateNext />
            </Button>
        </div>
    )
}

/*
 * Компонент-страниц. Отвечает за отображение страницы с товарами
 * определённого типа с возможностью фильтрации.
 */
const GoodsPage: FC<GoodsPageProps> = () => {
    // Получаем id типа товара и текущую страницу из адресса страницы
    const { subGoodsTypeId, page } = useParams()

    // Функция для изменения страницы
    const nav = useNavigate()

    // Состояние фильтра поиска
    const [filtersState, setFiltersState] = useState<IAllFilterState>(null)

    // Состояние открытости боковой панели фильтров (для маленькитх экранов)
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)

    // Общее кол-во товароы найденных по фильтру
    const [totalGoodsCount, setTotalGoodsCount] = useState(0)

    // Тип отображаемых карточек товара
    const [isFull, setIsFull] = useState(false)

    // Сортировка
    // -0 - умолчание
    // 1 - возраствнеи
    // 2 - убывание
    const [sort, setSort] = useState(1)

    // Запрашиваем данные с сервера с учётом фильтров и типа товара
    const { loading, error, data } = useQuery<IGetDataForGoodsPage>(
        GET_DATA_FOR_GOODS_PAGE,
        {
            variables: {
                subId: Number(subGoodsTypeId),
                filters: filtersState,
                take: 9,
                skip: (Number(page) - 1) * 9,
                sort,
            },
        }
    )

    // Получение данных для отображения фильтров
    const filtersData = useQuery(GET_FILTERS_BY_TYPE, {
        variables: { subId: Number(subGoodsTypeId) },
    })

    // Состояние пагинации [возмож6ность пролистать назад, в.п. вперёд]
    const [canPrev, canNext] = paginationConditions(
        9,
        Number(page),
        totalGoodsCount
    )

    // Переход на следёщую страницу
    const nextPage = () => {
        if (canNext) nav(`/goods/${subGoodsTypeId}/${Number(page) + 1}`)
    }

    // Переход на предыдущую страницу
    const prevPage = () => {
        if (canPrev) nav(`/goods/${subGoodsTypeId}/${Number(page) - 1}`)
    }

    // Инициализация данных
    useLayoutEffect(() => {
        // Инициальзация фильтра
        if (data && filtersState === null)
            setFiltersState(createFilterState(data.filters))

        // При получении общего кол-во товаров, сохраняем это значение в состояние
        if (data) setTotalGoodsCount(data.filteredGoods.totalCount)
    }, [data])

    // Изменение сортировки товароы
    const changeSort = (val) => {
        // Если текущее состояние фильтра не совподает
        // с тем что установлен сейчас то меняем состояние фильтр
        // и перенаправляем пользователя на первую страницу товаров
        if (val !== sort) {
            setSort(val)
            nav(`/goods/${subGoodsTypeId}/${1}`)
        }
    }

    // В случае ошибки выводить грустный смайлик
    // TODO: Сделать компонент для отображения ошибок
    if (error || filtersData.error) return <p>Error :(</p>

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
                    {/* Панель фильтров товаров */}
                    {filtersData.loading || filtersState === null ? (
                        <Loader page />
                    ) : (
                        <FilterPanel
                            filters={filtersData.data.filters}
                            onChange={(ans) => {
                                setIsPanelOpen(false)
                                setFiltersState(ans)
                            }}
                            value={filtersState}
                        />
                    )}
                    {/*=================*/}

                    <div
                        className={styles.GoodsPage__FilterPanelBack}
                        onClick={() => {
                            setIsPanelOpen(false)
                        }}
                    />
                </div>

                <div className={styles.GoodsPage__GoodsList}>
                    {/* Панель надо списком */}
                    <HeadList
                        isFull={isFull}
                        onPanelOpen={() => {
                            setIsPanelOpen(true)
                        }}
                        onChangeSort={changeSort}
                        setIsFull={setIsFull}
                    />
                    {/*=================*/}

                    {/* Список товаров */}
                    {loading ? (
                        <Loader page />
                    ) : (
                        <GoodsList
                            data={data.filteredGoods.goods}
                            isFull={isFull}
                        />
                    )}
                    {/*=================*/}

                    {/*=== Пагинация ===*/}
                    <Pagination
                        canNext={canNext}
                        canPrev={canPrev}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                    {/*=================*/}
                </div>
            </div>
        </div>
    )
}

export default GoodsPage
