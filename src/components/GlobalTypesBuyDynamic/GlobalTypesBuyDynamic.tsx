import React, { FC, useState } from 'react'
import styles from './GlobalTypesBuyDynamic.module.scss'
import GlobalTypesBuyDynamicProps from './GlobalTypesBuyDynamic.props'
import { useQuery } from '@apollo/client'
import { GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE } from '../../apollo/fetchs'
import {
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts'
import { IGlobalTypeStats } from '../../interfaces/statistic.interface'

interface GlobalGraphProps {
    data: IGlobalTypeStats
}
const GlobalGraph: FC<GlobalGraphProps> = ({ data }) => {
    const renderData = data.data.map((el) => {
        return {
            name: el.globalType.name,
            profit: el.profit,
        }
    })
    return (
        <ResponsiveContainer
            width='100%'
            height='100%'
        >
            <BarChart
                width={500}
                height={300}
                data={renderData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    dataKey='name'
                    stroke='#ffffff'
                />
                <YAxis stroke='#ffffff' />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey='profit'
                    name='Прибыль'
                    fill='#00b5ff'
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

const GlobalTypesBuyDynamic: FC<GlobalTypesBuyDynamicProps> = () => {
    const startYear = 2022
    const currentYear = new Date().getFullYear()

    const [startDate, setStartDate] = useState(new Date(startYear, 0, 2))
    const [endDate, setEndDate] = useState(new Date(currentYear, 0, 2))

    const { data, error, loading } = useQuery(
        GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
        {
            variables: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }
    )

    return (
        <div className={styles.GlobalTypesBuyDynamic}>
            <div className={styles.GlobalTypesBuyDynamic__container}>
                {data ? (
                    <GlobalGraph data={data.getGlobalTypeBuyDynamicByRange} />
                ) : (
                    <>loading</>
                )}
            </div>
        </div>
    )
}

export default GlobalTypesBuyDynamic
