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
            {!data.length ? (
                <div className={styles.GoodsList__noData}>Товаров пока нет</div>
            ) : (
                <div className={styles.GoodsList__container}>
                    <div className={styles.GoodsList__head}>
                        <Button
                            secondary
                            onClick={onPanelOpen}
                            className={styles.GoodsList__btnFilter}
                            disable={!data.length}
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
                            className={styles.GoodsList__sortSelector}
                        />
                    </div>

                    <div
                        className={styles.GoodsList__goodsContainer}
                        style={{
                            gridTemplateColumns:
                                isFull || !data.length ? '1fr' : '',
                        }}
                    >
                        {data.map((good) => (
                            <GoodCard
                                data={good}
                                isFull={isFull}
                                key={good.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GoodsList
