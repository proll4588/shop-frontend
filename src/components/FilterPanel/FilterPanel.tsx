/* Хуки */
import classNames from 'classnames'
import React, { FC, useState } from 'react'

/* Компоненты */
import FiltersMenuElements from '../FiltersMenuElements/FiltersMenuElements'
import Button from '../UI/Button/Button'

/* Описание компонента */
import styles from './FilterPanel.module.scss'
import FilterPanelProps, { IAllFilterState } from './FilterPanel.props'
import { useNavigate, useParams } from 'react-router-dom'

// TODO: При изменении фильтра, как-то показывать это пользователю
// Панель фильтров товароы
const FilterPanel: FC<FilterPanelProps> = ({ filters, onChange, value }) => {
    const { generalFilters, typeFilters } = filters
    const { brand, price } = generalFilters

    const { subGoodsTypeId, page } = useParams()
    const nav = useNavigate()

    // Состояние фильтра
    const [filtersValue, setFiltersValue] = useState<IAllFilterState>(value)

    // При изменении фильтра производителей
    const brandsFilterHandler = (brand) => {
        setFiltersValue((prev) => ({
            ...prev,
            generalFilters: { ...prev.generalFilters, brand },
        }))
    }

    // При изменении фильтра цены
    const priceFilterHandler = (price) => {
        setFiltersValue((prev) => ({
            ...prev,
            generalFilters: { ...prev.generalFilters, price },
        }))
    }

    const typeFilterHandler = (id, value) => {
        setFiltersValue((prev) => {
            let newS = { ...prev }

            const isIn = !!prev.typeFilters.find((filter) => filter.id === id)
            if (isIn) {
                newS.typeFilters = prev.typeFilters.map((filter) => ({
                    id: filter.id,
                    state: filter.id === id ? value : filter.state,
                }))
            } else {
                newS = { ...prev }
                newS.typeFilters.push({ id, state: value })
            }

            return newS
        })
    }

    // Применении фильтра
    const doChange = () => {
        // При применении фильтра перенаправляем пользователья на первую страницу
        nav(`/goods/${subGoodsTypeId}/${1}`)

        onChange && onChange(filtersValue)
    }

    return (
        <div className={classNames(styles.FilterPanel)}>
            <div className={styles.FilterPanel__container}>
                <Button
                    secondary
                    onClick={doChange}
                    className={styles.FilterPanel__applyBtn}
                >
                    Применить
                </Button>

                {/* Производители */}
                {'values' in brand.data && (
                    <FiltersMenuElements
                        title={brand.name}
                        data={brand.data}
                        type={brand.type}
                        onChange={brandsFilterHandler}
                        value={filtersValue.generalFilters.brand}
                    />
                )}

                {/* Цены */}
                {'max' in price.data && 'min' in price.data && (
                    <FiltersMenuElements
                        title={price.name}
                        data={price.data}
                        type={price.type}
                        onChange={priceFilterHandler}
                        value={filtersValue.generalFilters.price}
                    />
                )}

                {/* ... */}

                {/* Фильиры типа */}
                {typeFilters.map((filter) => (
                    <FiltersMenuElements
                        title={filter.name}
                        data={filter.data}
                        type={filter.type}
                        isOpen={false}
                        key={filter.id}
                        onChange={(val) => {
                            typeFilterHandler(filter.id, val)
                        }}
                        value={
                            filtersValue.typeFilters.find(
                                (el) => el.id === filter.id
                            ).state
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default FilterPanel
