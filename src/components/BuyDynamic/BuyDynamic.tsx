import React, { FC, useEffect, useState } from 'react'
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
import { LabelInput } from '../LabelInput'
import Loader from '../UI/Loader/Loader'

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

// :-)
interface BuyGraphProps {
    year: number
}
export const BuyGraph: FC<BuyGraphProps> = ({ year }) => {
    const [cacheData, setCacheData] = useState(null)

    const { data, loading, error } = useQuery(GET_BUY_DYNAMIC_BY_YEAR, {
        variables: {
            year: year,
        },
    })

    // При получении новыйх данных, помещаем их
    // в кешь для дальнейшего отображения. Это сделано для того что
    // при взаимодействии с data напрямую в момент получения данных
    // data = undef и график ничего не отображает, поэтому мы
    // кэшируем данные для их отображения вовремя загрузки новых
    useEffect(() => {
        if (data) {
            // Преобразуем данные в нужный формат
            const ans = data.getBuyDynamicByYear.map((el) => {
                const date = new Date(el.date)
                const month = date.getMonth()

                return {
                    month: monthes[month],
                    profit: el.profit || 0,
                }
            })

            setCacheData(ans)
        }
    }, [data])

    // При ошибке отображаем ошибку
    // При отсутсвии в кеше данных и загрузке новых
    // отображаем loader
    if (error) return <>Error</>
    if (!cacheData && loading) return <Loader page />

    return (
        <ResponsiveContainer
            width={'100%'}
            height={'100%'}
        >
            <LineChart
                width={500}
                height={300}
                data={cacheData}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    dataKey='month'
                    stroke='#ffffff'
                />
                <YAxis
                    stroke='#ffffff'
                    width={50}
                />
                <Tooltip />
                <Legend />
                <Line
                    type='monotone'
                    dataKey='profit'
                    name='Доход'
                    stroke='#00b5ff'
                    activeDot={{ r: 8 }}
                    dot={{ r: 5 }}
                    strokeWidth={3}
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

    const yearChange = (id) => {
        setSelectedYear(range[id].name)
    }

    return (
        <div className={styles.BuyDynamic}>
            <div className={styles.BuyDynamic__container}>
                <div className={styles.BuyDynamic__head}>
                    <MyCombobox
                        elements={range}
                        defaultValue={range.at(-1)}
                        onSelect={yearChange}
                    />
                </div>

                <div className={styles.BuyDynamic__graph}>
                    <BuyGraph year={selectedYear} />
                </div>
            </div>
        </div>
    )
}

export default BuyDynamic
