import React, { FC, useState } from 'react'
import styles from './BuyDynamic.module.scss'
import BuyDynamicProps from './BuyDynamic.props'
import { useQuery } from '@apollo/client'
import { GET_BUY_DYNAMIC_BY_YEAR } from '../../apollo/fetchs'
import { IBuyStats } from '../../interfaces/statistic.interface'
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
import MyCombobox from '../UI/MyCombobox/MyCombobox'

const monthes = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
]

const yearRange = (start, end) => {
    let range = []
    for (let i = 0; i <= end - start; i++) {
        range.push({ id: i, name: start + i })
    }

    return range
}

interface BuyGraphProps {
    data: IBuyStats[]
}
const BuyGraph: FC<BuyGraphProps> = ({ data }) => {
    const dateForrander = data.map((el) => {
        const date = new Date(el.date)
        const month = date.getMonth()

        return {
            month: monthes[month],
            profit: el.profit || 0,
        }
    })

    return (
        <ResponsiveContainer
            width={'100%'}
            height={'100%'}
        >
            <LineChart
                width={500}
                height={300}
                data={dateForrander}
                margin={{
                    top: 30,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    dataKey='month'
                    stroke='#ffffff'
                />
                <YAxis stroke='#ffffff' />
                <Tooltip />
                <Legend />
                <Line
                    type='monotone'
                    dataKey='profit'
                    name='Прибыль'
                    stroke='#00b5ff'
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

const BuyDynamic: FC<BuyDynamicProps> = () => {
    const startYear = 2022
    const currentYear = new Date().getFullYear()

    const [range] = useState(yearRange(startYear, currentYear))
    const [selectedYear, setSelectedYear] = useState(currentYear)

    const { data, loading, error } = useQuery(GET_BUY_DYNAMIC_BY_YEAR, {
        variables: {
            year: Number(selectedYear),
        },
    })

    const yearChange = (id) => {
        setSelectedYear(range[id].name)
    }

    return (
        <div className={styles.BuyDynamic}>
            <div className={styles.BuyDynamic__container}>
                <MyCombobox
                    elements={range}
                    defaultValue={range.at(-1)}
                    onSelect={yearChange}
                />
                {data ? (
                    <BuyGraph data={data.getBuyDynamicByYear} />
                ) : (
                    <>Loading</>
                )}
            </div>
        </div>
    )
}

export default BuyDynamic
