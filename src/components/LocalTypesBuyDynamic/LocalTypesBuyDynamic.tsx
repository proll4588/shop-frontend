import React, { FC, useState } from 'react'
import styles from './LocalTypesBuyDynamic.module.scss'
import LocalTypesBuyDynamicProps from './LocalTypesBuyDynamic.props'
import useDebounce from '../../hooks/debounce.hook'
import {
    FIND_GLOBAL_TYPES,
    GET_LOCAL_TYPE_BY_DYNAMIC_BY_RANGE,
} from '../../apollo/fetchs'
import { useQuery } from '@apollo/client'
import { ILocalTypeStats } from '../../interfaces/statistic.interface'
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
import MyCombobox from '../UI/MyCombobox/MyCombobox'

interface GlobalTypesComboboxProps {
    onChange?: (id: number) => void
}
const GlobalTypesCombobox: FC<GlobalTypesComboboxProps> = ({ onChange }) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(FIND_GLOBAL_TYPES, {
        variables: { search: query },
    })

    const types = data ? data.findGlobalType : []

    return (
        <div className={styles.GlobalTypesCombobox}>
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                loading={loading || !!error}
                canBeNull
                nullValue='Все'
            />
        </div>
    )
}

interface LocalGraphProps {
    data: ILocalTypeStats
}
const LocalGraph: FC<LocalGraphProps> = ({ data }) => {
    const renderData = data.data.map((el) => {
        return {
            name: el.localType.name,
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

const LocalTypesBuyDynamic: FC<LocalTypesBuyDynamicProps> = () => {
    const startYear = 2022
    const currentYear = new Date().getFullYear()

    // TODO: Мб сделать хук useDateRange
    const [startDate, setStartDate] = useState(
        new Date(startYear, 0, 2).toISOString().substring(0, 10)
    )
    const [endDate, setEndDate] = useState(
        new Date(currentYear, 0, 2).toISOString().substring(0, 10)
    )
    const dbStartDate = useDebounce(startDate, 600)
    const dbEndDate = useDebounce(endDate, 600)

    const [globalId, setGlobalId] = useState(null)

    const { data, error, loading } = useQuery(
        GET_LOCAL_TYPE_BY_DYNAMIC_BY_RANGE,
        {
            variables: {
                globalTypeId: globalId === -1 ? null : globalId,
                startDate: dbStartDate,
                endDate: dbEndDate,
            },
        }
    )

    const startDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const endDateChange = (e) => {
        setEndDate(e.target.value)
    }

    return (
        <div className={styles.LocalTypesBuyDynamic}>
            <div className={styles.LocalTypesBuyDynamic__container}>
                <input
                    type={'date'}
                    onChange={startDateChange}
                    defaultValue={startDate}
                />
                <input
                    type={'date'}
                    onChange={endDateChange}
                    defaultValue={endDate}
                />
                <GlobalTypesCombobox onChange={setGlobalId} />
                {data ? (
                    <LocalGraph data={data.getLocalTypeBuyDynamicByRange} />
                ) : (
                    <>loading</>
                )}
            </div>
        </div>
    )
}

export default LocalTypesBuyDynamic
