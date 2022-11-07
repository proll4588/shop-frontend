import React, { FC, useState } from 'react'
import GoodCard from '../GoodCard/GoodCard'
import Button from '../UI/Button/Button'
import Dropdown from '../UI/Dropdown/Dropdown'
import GoodCardTypeSwitcher from '../UI/GoodCardTypeSwitcher/GoodCardTypeSwitcher'
import styles from './GoodsList.module.scss'
import GoodsListProps from './GoodsList.props'

const sortNames = [
    'Сортировка по умолчанию',
    'По возрастанию цены',
    'По убыванию цены',
]

const GoodsList: FC<GoodsListProps> = ({ data, onPanelOpen }) => {
    const [isFull, setIsFull] = useState<boolean>(false)

    return (
        <div className={styles.GoodsList}>
            <div className={styles.GoodsList__container}>
                <div className={styles.GoodsList__head}>
                    <Button
                        secondary
                        onClick={onPanelOpen}
                        className={styles.GoodsList__btnFilter}
                    >
                        Filters
                    </Button>
                    <GoodCardTypeSwitcher
                        value={isFull}
                        onChange={setIsFull}
                    />
                    <Dropdown
                        content={sortNames}
                        defaultVal={0}
                        className={styles.GoodsList__sortSelector}
                    />
                </div>

                <div
                    className={styles.GoodsList__goodsContainer}
                    style={{
                        gridTemplateColumns: isFull ? '1fr' : '',
                    }}
                >
                    {data.length
                        ? data.map((good) => (
                              <GoodCard
                                  data={good}
                                  isFull={isFull}
                                  key={good.id}
                              />
                          ))
                        : 'Товаров пока нет'}

                    {data.length
                        ? data.map((good) => (
                              <GoodCard
                                  data={good}
                                  isFull={isFull}
                                  key={good.id}
                              />
                          ))
                        : 'Товаров пока нет'}

                    {data.length
                        ? data.map((good) => (
                              <GoodCard
                                  data={good}
                                  isFull={isFull}
                                  key={good.id}
                              />
                          ))
                        : 'Товаров пока нет'}
                </div>
            </div>
        </div>
    )
}

export default GoodsList
