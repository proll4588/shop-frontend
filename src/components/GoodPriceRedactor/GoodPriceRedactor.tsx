import React, { FC, useContext, useState } from 'react'
import styles from './GoodPriceRedactor.module.scss'
import GoodPriceRedactorProps from './GoodPriceRedactor.props'
import { LabelInput } from '../LabelInput'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useParams } from 'react-router-dom'
import GoodContext from '../../contexts/good.context'
import { useMutation } from '@apollo/client'
import { GET_DATA_FOR_GOOD_PAGE, UPDATE_GOOD_PRICE } from '../../apollo/fetchs'
import Button from '../UI/Button/Button'

interface PriceChartProps {
    allPrices: {
        date: string
        price: number
        discount?: number
    }[]
}
const PriceChart: FC<PriceChartProps> = ({ allPrices }) => {
    const data = allPrices.map((el) => {
        const date = new Date(el.date)
        const dateStr =
            date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate()
        const price = el.discount || el.price

        return { date: dateStr, price: price }
    })

    return (
        <ResponsiveContainer
            width={'100%'}
            height={'100%'}
        >
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type='monotone'
                    dataKey='price'
                    stroke='#8884d8'
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

interface PriceProps {}
export const Price: FC<PriceProps> = () => {
    const { id } = useParams()
    const { all_prices: allPrices, current_price: currentPrice } =
        useContext(GoodContext)

    const [price, setPrice] = useState(String(currentPrice.price))
    const [discount, setDiscount] = useState(
        currentPrice.discount ? String(currentPrice.discount) : ''
    )

    const [updatePrice, updateData] = useMutation(UPDATE_GOOD_PRICE, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }

    const discountChangeHandler = (e) => {
        setDiscount(e.target.value)
    }

    const change = () => {
        updatePrice({
            variables: {
                goodId: Number(id),
                price: Number(price),
                discount: discount.length === 0 ? undefined : Number(discount),
            },
        })
    }

    return (
        <div className={styles.Price}>
            <div className={styles.Price__container}>
                <div className={styles.Price__left}>
                    <LabelInput label='Цена'>
                        <input
                            type='number'
                            value={price}
                            onChange={priceChangeHandler}
                        />
                    </LabelInput>

                    <LabelInput label='Цена с учётом скидки'>
                        <input
                            type='number'
                            value={discount}
                            onChange={discountChangeHandler}
                        />
                    </LabelInput>
                </div>
                <div className={styles.Price__right}>
                    <PriceChart allPrices={allPrices} />
                </div>
            </div>
            <Button
                secondary
                className={styles.Price__btn}
                onClick={change}
            >
                Изменить цену
            </Button>
        </div>
    )
}

const GoodPriceRedactor: FC<GoodPriceRedactorProps> = () => {
    return <Price />
}

export default GoodPriceRedactor
