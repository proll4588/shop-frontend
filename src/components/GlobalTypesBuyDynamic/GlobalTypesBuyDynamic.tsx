import React, { FC, useEffect, useState } from 'react'
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
import useDebounce from '../../hooks/debounce.hook'
import Loader from '../UI/Loader/Loader'

interface GlobalGraphProps {
    startDate: string
    endDate: string
}
const GlobalGraph: FC<GlobalGraphProps> = ({ startDate, endDate }) => {
    const [cacheData, setCacheData] = useState(null)

    const { data, error, loading } = useQuery(
        GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
        {
            variables: {
                startDate: startDate,
                endDate: endDate,
            },
        }
    )

    useEffect(() => {
        if (data) {
            const ans = data.getGlobalTypeBuyDynamicByRange.data.map((el) => {
                return {
                    name: el.globalType.name,
                    profit: el.profit,
                }
            })

            setCacheData(ans)
        }
    }, [data])

    if (error) return <>Error</>
    if (!cacheData && loading) return <Loader page />

    return (
        <ResponsiveContainer
            width='100%'
            height='100%'
        >
            <BarChart
                width={500}
                height={300}
                data={cacheData}
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

    const [startDate, setStartDate] = useState(
        new Date(startYear, 0, 2).toISOString().substring(0, 10)
    )
    const [endDate, setEndDate] = useState(
        new Date(currentYear, 0, 2).toISOString().substring(0, 10)
    )
    const dbStartDate = useDebounce(startDate, 600)
    const dbEndDate = useDebounce(endDate, 600)

    const startDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const endDateChange = (e) => {
        setEndDate(e.target.value)
    }

    return (
        <div className={styles.GlobalTypesBuyDynamic}>
            <div className={styles.GlobalTypesBuyDynamic__container}>
                <div className={styles.GlobalTypesBuyDynamic__head}>
                    <input
                        type={'date'}
                        onChange={startDateChange}
                        defaultValue={startDate}
                    />
                    -
                    <input
                        type={'date'}
                        onChange={endDateChange}
                        defaultValue={endDate}
                    />
                </div>

                <GlobalGraph
                    startDate={dbStartDate}
                    endDate={dbEndDate}
                />
            </div>
        </div>
    )
}

export default GlobalTypesBuyDynamic
