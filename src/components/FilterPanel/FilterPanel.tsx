/* Хуки */
import React, { FC, useState } from 'react'

/* Компоненты */
import FiltersMenuElements from '../FiltersMenuElements/FiltersMenuElements'
import Button from '../UI/Button/Button'

/* Описание компонента */
import styles from './FilterPanel.module.scss'
import FilterPanelProps, { IFilters } from './FilterPanel.props'

// TODO: При изменении фильтра, как-то показывать это пользователю
// Панель фильтров товароы
const FilterPanel: FC<FilterPanelProps> = ({ data, onChange, value }) => {
    // Состояние фильтра
    const [filters, setFilters] = useState<IFilters>(value ? value : {})

    // При изменении фильтра производителей
    const brandsFilterHandler = (brands) => {
        setFilters((prev) => ({ ...prev, brands }))
    }

    // При изменении фильтра цены
    const priceFilterHandler = (price) => {
        setFilters((prev) => ({ ...prev, price }))
    }

    // Применении фильтра
    const doChange = () => {
        onChange && onChange(filters)
    }

    return (
        <div className={styles.FilterPanel}>
            <div className={styles.FilterPanel__container}>
                <Button
                    secondary
                    onClick={doChange}
                    className={styles.FilterPanel__applyBtn}
                >
                    Применить
                </Button>
                <FiltersMenuElements
                    title='Brands'
                    data={data.brands.map((el) => el.name)}
                    type='check'
                    onChange={brandsFilterHandler}
                    value={'brands' in filters ? filters.brands : null}
                />
                <FiltersMenuElements
                    title='Price range'
                    data={data.price}
                    type='range'
                    onChange={priceFilterHandler}
                    value={'price' in filters ? filters.price : null}
                />
            </div>
        </div>
    )
}

export default FilterPanel
